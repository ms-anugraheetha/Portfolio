import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultProjectId } from "@/data/projects";
import { getRoutePath } from "@/data/routes";
import type { ProjectId, SectionId } from "@/types/workspace";

type HistoryEntry = {
  section: SectionId;
  projectId: ProjectId;
};

type WorkspaceContextValue = {
  activeSection: SectionId;
  activeProjectId: ProjectId;
  routePath: string;
  canGoBack: boolean;
  canGoForward: boolean;
  navigate: (section: SectionId, projectId?: ProjectId) => void;
  selectProject: (projectId: ProjectId) => void;
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  reloadKey: number;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

const initialEntry: HistoryEntry = {
  section: "home",
  projectId: defaultProjectId,
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState({
    history: [initialEntry],
    index: 0,
  });
  const [reloadKey, setReloadKey] = useState(0);

  const current = nav.history[nav.index] ?? initialEntry;
  const activeSection = current.section;
  const activeProjectId = current.projectId;

  const routePath = useMemo(
    () =>
      getRoutePath(
        activeSection,
        activeSection === "projects" ? activeProjectId : undefined,
      ),
    [activeSection, activeProjectId],
  );

  const pushHistory = useCallback((entry: HistoryEntry) => {
    setNav((prev) => {
      const trimmed = prev.history.slice(0, prev.index + 1);
      const last = trimmed[trimmed.length - 1];
      if (
        last?.section === entry.section &&
        last?.projectId === entry.projectId
      ) {
        return prev;
      }
      const history = [...trimmed, entry];
      return { history, index: history.length - 1 };
    });
  }, []);

  const navigate = useCallback(
    (section: SectionId, projectId?: ProjectId) => {
      pushHistory({
        section,
        projectId: projectId ?? activeProjectId,
      });
    },
    [activeProjectId, pushHistory],
  );

  const selectProject = useCallback(
    (projectId: ProjectId) => {
      pushHistory({ section: "projects", projectId });
    },
    [pushHistory],
  );

  const goBack = useCallback(() => {
    setNav((prev) =>
      prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev,
    );
  }, []);

  const goForward = useCallback(() => {
    setNav((prev) =>
      prev.index < prev.history.length - 1
        ? { ...prev, index: prev.index + 1 }
        : prev,
    );
  }, []);

  const reload = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      activeProjectId,
      routePath,
      canGoBack: nav.index > 0,
      canGoForward: nav.index < nav.history.length - 1,
      navigate,
      selectProject,
      goBack,
      goForward,
      reload,
      reloadKey,
    }),
    [
      activeSection,
      activeProjectId,
      routePath,
      nav.index,
      nav.history.length,
      navigate,
      selectProject,
      goBack,
      goForward,
      reload,
      reloadKey,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return ctx;
}
