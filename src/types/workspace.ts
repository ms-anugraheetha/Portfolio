export type SectionId =
  | "home"
  | "projects"
  | "about"
  | "stack"
  | "experience"
  | "contact";

/** Built-in projects use short ids ("rasova"); CMS projects use UUIDs. */
export type ProjectId = string;
