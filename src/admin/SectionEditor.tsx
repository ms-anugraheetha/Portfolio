import { useCallback, useEffect, useState, type ReactNode } from "react";
import { defaultContent } from "@/content/defaults";
import type { SectionKey, SectionMap } from "@/content/types";
import {
  discardDraft,
  loadSection,
  publishSection,
  saveDraft,
  SessionExpiredError,
  type SectionState,
} from "./api";
import { Badge, Button, Spinner, useToast } from "./ui";

/**
 * Load → edit → save draft / publish for one page section.
 *  • "Save draft" stores privately (only admins can read drafts).
 *  • "Preview" opens the live site showing your drafts (admins only).
 *  • "Publish" makes the current version public and clears the draft.
 */
export function SectionEditor<K extends SectionKey>({
  sectionKey,
  title,
  description,
  validate,
  onSessionExpired,
  children,
}: {
  sectionKey: K;
  title: string;
  description: string;
  validate?: (value: SectionMap[K]) => string | null;
  onSessionExpired: () => void;
  children: (value: SectionMap[K], set: (next: SectionMap[K]) => void) => ReactNode;
}) {
  const toast = useToast();
  const [state, setState] = useState<SectionState<K> | null>(null);
  const [value, setValue] = useState<SectionMap[K] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<null | "save" | "publish" | "discard">(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fail = useCallback(
    (err: unknown) => {
      if (err instanceof SessionExpiredError) return onSessionExpired();
      toast("error", err instanceof Error ? err.message : "Something went wrong.");
    },
    [onSessionExpired, toast],
  );

  const reload = useCallback(async () => {
    try {
      setLoadError(null);
      const s = await loadSection(sectionKey);
      setState(s);
      setValue(s.draft ?? s.published ?? structuredClone(defaultContent[sectionKey]));
      setDirty(false);
    } catch (err) {
      if (err instanceof SessionExpiredError) return onSessionExpired();
      setLoadError(err instanceof Error ? err.message : "Couldn't load this section.");
    }
  }, [sectionKey, onSessionExpired]);

  useEffect(() => {
    reload();
  }, [reload]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const set = (next: SectionMap[K]) => {
    setValue(next);
    setDirty(true);
  };

  const run = async (kind: "save" | "publish" | "discard") => {
    if (!value) return;
    if (kind !== "discard") {
      const problem = validate?.(value);
      if (problem) return toast("error", problem);
    }
    setBusy(kind);
    try {
      if (kind === "save") await saveDraft(sectionKey, value);
      if (kind === "publish") await publishSection(sectionKey, value);
      if (kind === "discard") await discardDraft(sectionKey);
      toast(
        "success",
        kind === "save" ? "Draft saved — not public yet." : kind === "publish" ? `${title} published.` : "Draft discarded.",
      );
      await reload();
    } catch (err) {
      fail(err);
    } finally {
      setBusy(null);
    }
  };

  if (loadError) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6 text-sm" role="alert">
        <p className="font-semibold text-cherry-dark">{loadError}</p>
        <Button className="mt-3" onClick={reload}>
          Try again
        </Button>
      </div>
    );
  }
  if (!state || !value) {
    return (
      <div className="flex items-center gap-2 p-6 text-sm text-ink-muted" role="status">
        <Spinner /> Loading…
      </div>
    );
  }

  const status = dirty ? (
    <Badge tone="dirty">Unsaved changes</Badge>
  ) : state.draft ? (
    <Badge tone="draft">Draft saved · not published</Badge>
  ) : state.published ? (
    <Badge tone="live">Published</Badge>
  ) : (
    <Badge tone="muted">Not published yet</Badge>
  );

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-5 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-xl font-extrabold text-ink">{title}</h2>
              {status}
            </div>
            <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.draft && !dirty && (
              <Button variant="ghost" size="sm" loading={busy === "discard"} onClick={() => run("discard")}>
                Discard draft
              </Button>
            )}
            <Button size="sm" disabled={!!busy} loading={busy === "save"} onClick={() => run("save")}>
              Save draft
            </Button>
            <Button
              size="sm"
              disabled={dirty || !state.draft}
              title={dirty ? "Save a draft first" : state.draft ? "Open the site with your drafts" : "Nothing to preview"}
              onClick={() => window.open("/?preview", "_blank", "noopener")}
            >
              Preview
            </Button>
            <Button variant="primary" size="sm" disabled={!!busy} loading={busy === "publish"} onClick={() => run("publish")}>
              Publish
            </Button>
          </div>
        </div>
        {(state.publishedAt || state.draftUpdatedAt) && (
          <p className="mt-1.5 text-xs text-ink-soft">
            {state.publishedAt && <>Last published {formatTime(state.publishedAt)}. </>}
            {state.draftUpdatedAt && <>Draft saved {formatTime(state.draftUpdatedAt)}.</>}
          </p>
        )}
      </div>
      <div className="space-y-5">{children(value, set)}</div>
    </div>
  );
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
