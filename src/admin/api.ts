import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { getSupabase, PROJECT_IMAGE_BUCKET } from "@/lib/supabase";
import { defaultContent } from "@/content/defaults";
import { projectToRow, rowToProject, type ProjectRow } from "@/content/projectRows";
import { SECTION_KEYS, type Project, type SectionKey, type SectionMap } from "@/content/types";

/** Thrown when the session is missing/expired so the UI can send you to login. */
export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
  }
}

export async function sb(): Promise<SupabaseClient> {
  const pending = getSupabase();
  if (!pending) throw new Error("The CMS isn't configured (missing Supabase environment variables).");
  return pending;
}

function check(error: PostgrestError | null | { message: string; code?: string; status?: number }) {
  if (!error) return;
  const e = error as { message: string; code?: string; status?: number };
  if (e.code === "PGRST301" || e.code === "PGRST303" || e.status === 401 || /jwt/i.test(e.message)) {
    throw new SessionExpiredError();
  }
  if (e.code === "42501" || /row-level security|permission denied/i.test(e.message)) {
    throw new Error("Permission denied — this account isn't allowed to change portfolio content.");
  }
  throw new Error(e.message || "Something went wrong.");
}

/* ───────────── Page sections (draft / published) ───────────── */

export type SectionState<K extends SectionKey> = {
  published: SectionMap[K] | null;
  publishedAt: string | null;
  draft: SectionMap[K] | null;
  draftUpdatedAt: string | null;
};

export async function loadSection<K extends SectionKey>(key: K): Promise<SectionState<K>> {
  const client = await sb();
  const [pub, draft] = await Promise.all([
    client.from("content_published").select("data, published_at").eq("key", key).maybeSingle(),
    client.from("content_drafts").select("data, updated_at").eq("key", key).maybeSingle(),
  ]);
  check(pub.error);
  check(draft.error);
  const merge = (d: unknown) => (d ? ({ ...defaultContent[key], ...(d as object) } as SectionMap[K]) : null);
  return {
    published: merge(pub.data?.data),
    publishedAt: pub.data?.published_at ?? null,
    draft: merge(draft.data?.data),
    draftUpdatedAt: draft.data?.updated_at ?? null,
  };
}

export async function saveDraft<K extends SectionKey>(key: K, data: SectionMap[K]) {
  const client = await sb();
  const { error } = await client
    .from("content_drafts")
    .upsert({ key, data, updated_at: new Date().toISOString() });
  check(error);
}

/** Make `data` live, then clear the draft (nothing left pending). */
export async function publishSection<K extends SectionKey>(key: K, data: SectionMap[K]) {
  const client = await sb();
  const { error } = await client
    .from("content_published")
    .upsert({ key, data, published_at: new Date().toISOString() });
  check(error);
  const del = await client.from("content_drafts").delete().eq("key", key);
  check(del.error);
}

export async function discardDraft(key: SectionKey) {
  const client = await sb();
  const { error } = await client.from("content_drafts").delete().eq("key", key);
  check(error);
}

/* ───────────── Projects ───────────── */

export type AdminProject = Project & { published: boolean };

export async function listProjects(): Promise<AdminProject[]> {
  const client = await sb();
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  check(error);
  return (data as ProjectRow[]).map(rowToProject);
}

export async function createProject(p: Project, order: number): Promise<AdminProject> {
  const client = await sb();
  const { data, error } = await client
    .from("projects")
    .insert(projectToRow(p, order, false)) // new projects start as unpublished drafts
    .select("*")
    .single();
  check(error);
  return rowToProject(data as ProjectRow);
}

export async function updateProject(id: string, p: Project, order: number, published: boolean) {
  const client = await sb();
  const { data, error } = await client
    .from("projects")
    .update(projectToRow(p, order, published))
    .eq("id", id)
    .select("*")
    .single();
  check(error);
  return rowToProject(data as ProjectRow);
}

export async function setProjectPublished(id: string, published: boolean) {
  const client = await sb();
  const { error } = await client.from("projects").update({ is_published: published }).eq("id", id);
  check(error);
}

export async function reorderProjects(ids: string[]) {
  const client = await sb();
  for (const [i, id] of ids.entries()) {
    const { error } = await client.from("projects").update({ sort_order: i }).eq("id", id);
    check(error);
  }
}

export async function deleteProject(p: AdminProject) {
  const client = await sb();
  const { error } = await client.from("projects").delete().eq("id", p.id);
  check(error);
  await removeUploadedImage(p.image);
}

/* ───────────── Images ───────────── */

export const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export function validateImage(file: File): string | null {
  if (!(IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return "Please choose a PNG, JPEG, WebP or GIF image.";
  }
  if (file.size > IMAGE_MAX_BYTES) return "Images must be 5 MB or smaller.";
  return null;
}

export async function uploadProjectImage(file: File): Promise<string> {
  const problem = validateImage(file);
  if (problem) throw new Error(problem);
  const client = await sb();
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `projects/${crypto.randomUUID()}.${ext}`;
  const { error } = await client.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
  check(error);
  return client.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Deletes an image we uploaded; built-in images in /public are left alone. */
export async function removeUploadedImage(url?: string) {
  const marker = `/storage/v1/object/public/${PROJECT_IMAGE_BUCKET}/`;
  if (!url || !url.includes(marker)) return;
  const client = await sb();
  await client.storage.from(PROJECT_IMAGE_BUCKET).remove([url.split(marker)[1]]);
}

/* ───────────── First-run import ───────────── */

export async function isInitialised(): Promise<boolean> {
  const client = await sb();
  const [pub, projects] = await Promise.all([
    client.from("content_published").select("key", { count: "exact", head: true }),
    client.from("projects").select("id", { count: "exact", head: true }),
  ]);
  check(pub.error);
  check(projects.error);
  return (pub.count ?? 0) > 0 || (projects.count ?? 0) > 0;
}

/**
 * Copies the portfolio's current built-in content (all pages, the four
 * projects and their illustrations) into the database as published content,
 * so the live site looks exactly the same after switching to the CMS.
 */
export async function importCurrentContent() {
  const client = await sb();
  const now = new Date().toISOString();
  const sections = SECTION_KEYS.map((key) => ({ key, data: defaultContent[key], published_at: now }));
  const pub = await client.from("content_published").upsert(sections, { ignoreDuplicates: true });
  check(pub.error);
  const rows = defaultContent.projects.map((p, i) => projectToRow(p, i, true));
  const proj = await client.from("projects").upsert(rows, { onConflict: "slug", ignoreDuplicates: true });
  check(proj.error);
}
