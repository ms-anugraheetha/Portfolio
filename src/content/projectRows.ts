import type { Project } from "./types";

/** A row of public.projects, as returned by Supabase. */
export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  short_title: string;
  category: string;
  summary: string;
  tagline: string;
  description: string;
  stack: string[];
  behind_the_build: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  status: "live" | "in-development";
  sort_order: number;
  is_published: boolean;
  updated_at?: string;
};

export function rowToProject(r: ProjectRow): Project & { published: boolean } {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    shortTitle: r.short_title || r.title,
    category: r.category,
    summary: r.summary,
    tagline: r.tagline,
    description: r.description,
    stack: r.stack ?? [],
    behindTheBuild: r.behind_the_build ?? [],
    github: r.github_url ?? "",
    demo: r.demo_url ?? undefined,
    image: r.image_url ?? undefined,
    status: r.status,
    published: r.is_published,
  };
}

export function projectToRow(p: Project, order: number, published: boolean): Omit<ProjectRow, "id"> {
  return {
    slug: p.slug,
    title: p.title,
    short_title: p.shortTitle,
    category: p.category,
    summary: p.summary,
    tagline: p.tagline,
    description: p.description,
    stack: p.stack,
    behind_the_build: p.behindTheBuild,
    github_url: p.github || null,
    demo_url: p.demo || null,
    image_url: p.image || null,
    status: p.status ?? "live",
    sort_order: order,
    is_published: published,
  };
}
