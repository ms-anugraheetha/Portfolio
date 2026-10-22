import { getSupabase } from "@/lib/supabase";
import { defaultContent } from "./defaults";
import { rowToProject, type ProjectRow } from "./projectRows";
import { SECTION_KEYS, type SectionMap, type SiteContent } from "./types";

type Loaded = { content: SiteContent; preview: boolean };

/** Missing fields fall back to the built-in defaults, so a partial or older
 *  document in the database can never blank out part of a page. */
function mergeSections(rows: { key: string; data: unknown }[]): SectionMap {
  const out = { ...defaultContent } as SectionMap;
  for (const k of SECTION_KEYS) {
    const row = rows.find((r) => r.key === k);
    if (row && row.data && typeof row.data === "object") {
      (out as Record<string, unknown>)[k] = { ...defaultContent[k], ...(row.data as object) };
    }
  }
  return out;
}

/**
 * Published content for visitors. With `?preview` in the URL AND a signed-in
 * admin session, drafts and unpublished projects are shown instead. Returns
 * null (keep built-in content) when the CMS isn't configured, hasn't been
 * initialised yet, or can't be reached.
 */
export async function loadContent(): Promise<Loaded | null> {
  const pending = getSupabase();
  if (!pending) return null;
  try {
    const sb = await pending;
    let preview = false;
    if (new URLSearchParams(window.location.search).has("preview")) {
      const { data } = await sb.auth.getSession();
      if (data.session) {
        const { data: isAdmin } = await sb.rpc("is_admin");
        preview = isAdmin === true;
      }
    }

    const [pub, drafts, projects] = await Promise.all([
      sb.from("content_published").select("key, data"),
      preview ? sb.from("content_drafts").select("key, data") : Promise.resolve({ data: [], error: null }),
      sb.from("projects").select("*").order("sort_order", { ascending: true }),
    ]);
    if (pub.error) throw pub.error;
    if (projects.error) throw projects.error;
    if (!pub.data?.length && !preview) return null; // CMS not initialised yet

    // Drafts override published copies, section by section.
    const rows = [...(pub.data ?? [])];
    for (const d of drafts.data ?? []) {
      const i = rows.findIndex((r) => r.key === d.key);
      if (i >= 0) rows[i] = d;
      else rows.push(d);
    }

    return {
      preview,
      content: {
        ...mergeSections(rows),
        projects: (projects.data as ProjectRow[]).map(rowToProject),
      },
    };
  } catch (err) {
    console.warn("Portfolio content couldn't be loaded; showing built-in content.", err);
    return null;
  }
}
