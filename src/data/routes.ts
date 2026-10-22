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
      return `${BASE}/skills`;
    case "experience":
      return `${BASE}/experience`;
    case "contact":
      return `${BASE}/contact`;
    case "projects":
      return projectId
        ? `${BASE}/projects/${projectSlugs[projectId]}`
        : `${BASE}/projects`;
  }
}

export type TabIcon = "cat" | "folder" | "user" | "code" | "trophy" | "mail";

export const sectionTabs: {
  id: SectionId;
  label: string;
  tabTitle: string;
  icon: TabIcon;
}[] = [
  { id: "home", label: "Home", tabTitle: "anu.exe | Home", icon: "cat" },
  { id: "projects", label: "Projects", tabTitle: "Projects", icon: "folder" },
  { id: "about", label: "About Me", tabTitle: "About Me", icon: "user" },
  { id: "stack", label: "Skills", tabTitle: "Skills", icon: "code" },
  {
    id: "experience",
    label: "Experience",
    tabTitle: "Experience & Achievements",
    icon: "trophy",
  },
  { id: "contact", label: "Contact", tabTitle: "Contact", icon: "mail" },
];
