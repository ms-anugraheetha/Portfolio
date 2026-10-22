import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client, created lazily so the public pages don't download the SDK
 * before first paint. Only the public anon/publishable key ever reaches the
 * browser — every write is authorised by Row Level Security in the database
 * (see supabase/migrations). A service-role / secret key is refused outright.
 */
const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

function looksPrivileged(k: string) {
  if (k.startsWith("sb_secret_")) return true;
  try {
    const payload = JSON.parse(atob(k.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload?.role === "service_role";
  } catch {
    return false;
  }
}

const privileged = key !== "" && looksPrivileged(key);
if (privileged) {
  console.error(
    "VITE_SUPABASE_ANON_KEY is a service-role/secret key. It must never be shipped to the browser — the CMS is disabled until you replace it with the anon/publishable key and rotate the leaked secret.",
  );
}

export const isCmsConfigured = Boolean(url && key && !privileged);

let clientPromise: Promise<SupabaseClient> | null = null;

export function getSupabase(): Promise<SupabaseClient> | null {
  if (!isCmsConfigured) return null;
  clientPromise ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    }),
  );
  return clientPromise;
}

export const PROJECT_IMAGE_BUCKET = "project-images";
