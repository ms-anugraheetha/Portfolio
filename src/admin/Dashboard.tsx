import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { CatIcon } from "@/components/ui/Icons";
import { importCurrentContent, isInitialised, SessionExpiredError } from "./api";
import { ProjectsEditor } from "./ProjectsEditor";
import { AboutEditor, ContactEditor, ExperienceEditor, HomeEditor, SkillsEditor } from "./sections";
import { Button, focusRing, useToast } from "./ui";

const TABS = [
  { id: "home", label: "Home page" },
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact details" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function Dashboard({
  session,
  onSignOut,
  onSessionExpired,
}: {
  session: Session;
  onSignOut: () => void;
  onSessionExpired: () => void;
}) {
  const toast = useToast();
  const [tab, setTab] = useState<TabId>(() => {
    const hash = window.location.hash.slice(1) as TabId;
    return TABS.some((t) => t.id === hash) ? hash : "projects";
  });
  const [initialised, setInitialised] = useState<boolean | null>(null);
  const [importing, setImporting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [importCount, setImportCount] = useState(0);

  useEffect(() => {
    window.history.replaceState(null, "", `#${tab}`);
  }, [tab]);

  const fail = useCallback(
    (err: unknown) => {
      if (err instanceof SessionExpiredError) return onSessionExpired();
      toast("error", err instanceof Error ? err.message : "Something went wrong.");
    },
    [onSessionExpired, toast],
  );

  useEffect(() => {
    isInitialised().then(setInitialised).catch(fail);
  }, [fail]);

  const doImport = async () => {
    setImporting(true);
    try {
      await importCurrentContent();
      setInitialised(true);
      setImportCount((n) => n + 1);
      window.dispatchEvent(new Event("cms:imported"));
      toast("success", "Imported your current content. The live site looks exactly the same.");
    } catch (err) {
      fail(err);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-frame p-1.5 sm:p-3 md:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-0.75rem)] max-w-[1400px] flex-col overflow-hidden rounded-xl bg-paper shadow-[0_30px_80px_-20px_rgba(60,0,4,0.55)] ring-1 ring-black/10 sm:min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-2.5rem)] md:rounded-2xl">
        {/* Top bar */}
        <header className="flex flex-wrap items-center gap-3 border-b border-line bg-chrome px-4 py-3 md:px-6">
          <span className="hidden gap-1.5 sm:flex" aria-hidden>
            <span className="size-3 rounded-full bg-[#ec5f57]" />
            <span className="size-3 rounded-full bg-[#f4bf4f]" />
            <span className="size-3 rounded-full bg-[#61c454]" />
          </span>
          <p className="flex items-center gap-2 text-sm font-bold text-ink">
            <CatIcon className="size-5 text-cherry" />
            anu.exe <span className="font-medium text-ink-soft">| Admin</span>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden max-w-[16rem] truncate text-xs text-ink-soft md:inline">{session.user.email}</span>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className={`hidden h-8 items-center rounded-[10px] px-3 text-[13px] font-semibold text-ink-muted hover:bg-blush hover:text-cherry sm:inline-flex ${focusRing}`}
            >
              View site ↗
            </a>
            <Button
              size="sm"
              loading={signingOut}
              onClick={async () => {
                setSigningOut(true);
                await onSignOut();
              }}
            >
              Log out
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col md:flex-row">
          {/* Section nav */}
          <nav aria-label="Admin sections" className="border-b border-line bg-paper-deep/40 md:w-60 md:shrink-0 md:border-b-0 md:border-r">
            <p className="hidden px-5 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-cherry md:block">// Content</p>
            <ul className="no-scrollbar flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible md:p-3">
              {TABS.map((t) => (
                <li key={t.id} className="shrink-0">
                  <button
                    type="button"
                    aria-current={tab === t.id ? "page" : undefined}
                    onClick={() => setTab(t.id)}
                    className={`w-full whitespace-nowrap rounded-[10px] px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      tab === t.id ? "bg-cherry text-white" : "text-ink-muted hover:bg-blush hover:text-cherry"
                    } ${focusRing}`}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="min-w-0 flex-1 px-4 pb-10 md:px-8">
            {initialised === false && (
              <div className="mt-5 rounded-2xl border border-cherry/30 bg-blush/50 p-5">
                <p className="font-semibold text-ink">Your database is empty.</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Import the portfolio’s current pages and its four projects (Rasova, Travel Destination Recommendation
                  System, UniMoney, Python Confidence Coach) with their illustrations. Until then, visitors keep seeing the
                  built-in content and your edits won’t appear on the site.
                </p>
                <Button variant="primary" className="mt-3" loading={importing} onClick={doImport}>
                  Import current content
                </Button>
              </div>
            )}
            <div className="pt-1">
              {tab === "home" && <HomeEditor key={`home-${importCount}`} onSessionExpired={onSessionExpired} />}
              {tab === "about" && <AboutEditor key={`about-${importCount}`} onSessionExpired={onSessionExpired} />}
              {tab === "projects" && <ProjectsEditor onSessionExpired={onSessionExpired} />}
              {tab === "skills" && <SkillsEditor key={`skills-${importCount}`} onSessionExpired={onSessionExpired} />}
              {tab === "experience" && <ExperienceEditor key={`experience-${importCount}`} onSessionExpired={onSessionExpired} />}
              {tab === "contact" && <ContactEditor key={`contact-${importCount}`} onSessionExpired={onSessionExpired} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
