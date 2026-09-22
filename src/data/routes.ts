import type { ProjectId, SectionId } from "@/types/workspace";

const BASE = "anugraheetha.dev";

export const projectSlugs: Record<ProjectId, string> = {
  rasova: "rasova",
  travel: "travel-system",
  unimoney: "unimoney",
  coach: "python-confidence-coach",
};

export function getRoutePath(
  section: SectionId,
  projectId?: ProjectId,
): string {
  switch (section) {
    case "home":
      return `${BASE}/`;
    case "about":
      return `${BASE}/about`;
    case "stack":
      return `${BASE}/stack`;
    case "contact":
      return `${BASE}/contact`;
    case "projects":
      return projectId
        ? `${BASE}/projects/${projectSlugs[projectId]}`
        : `${BASE}/projects`;
  }
}

export const sectionTabs: {
  id: SectionId;
  label: string;
  tabTitle: string;
}[] = [
  { id: "home", label: "Home", tabTitle: "New Tab" },
  { id: "projects", label: "Projects", tabTitle: "Projects" },
  { id: "about", label: "Approach", tabTitle: "Approach" },
  { id: "stack", label: "Stack", tabTitle: "Stack" },
  { id: "contact", label: "Contact", tabTitle: "Contact" },
];
