import type { Project } from "@/data/projects";
import type { TechCategory } from "@/data/techStack";

export type { Project, TechCategory };

/** Editable copy for the Home tab. */
export type HomeContent = {
  greeting: string;
  headingLine1: string;
  headingLine2: string;
  title: string;
  intro: string;
  ctaLabel: string;
  /** Optional CV link — shows a "Download CV" button when set. */
  cvUrl: string;
};

export type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  location: string;
};

export type AboutContent = {
  heading: string;
  paragraphs: string[];
  /** Quick-facts card under the illustration. */
  studying: string;
  status: string;
  education: EducationEntry[];
  principles: { title: string; body: string }[];
};

export type ContactContent = {
  fullName: string;
  shortName: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
};

export type SkillsContent = { categories: TechCategory[] };

export type Achievement = {
  title: string;
  detail?: string;
  period?: string;
  status?: string;
  description?: string;
};

export type ExperienceContent = { achievements: Achievement[] };

export type SectionKey = "home" | "about" | "contact" | "skills" | "experience";

export type SectionMap = {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  skills: SkillsContent;
  experience: ExperienceContent;
};

export type SiteContent = SectionMap & { projects: Project[] };

export const SECTION_KEYS: SectionKey[] = ["home", "about", "contact", "skills", "experience"];
