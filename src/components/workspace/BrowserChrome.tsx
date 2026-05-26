import { useState } from "react";
import { sectionTabs } from "@/data/routes";
import { site } from "@/data/site";
import { useWorkspace } from "@/context/WorkspaceContext";
import { buildHiringBrief } from "@/lib/hiringBrief";
import type { SectionId } from "@/types/workspace";
import { BrandMark } from "./BrandMark";
import { BrowserTabBar } from "./BrowserTabBar";
import { RecruiterKit } from "./RecruiterKit";
import { CopyToast } from "@/components/ui/CopyToast";

export function BrowserChrome() {
  const {
    routePath,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    reload,
    navigate,
  } = useWorkspace();
  const [toast, setToast] = useState<string | null>(null);
  const [appsOpen, setAppsOpen] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`https://${routePath}`);
      showToast("Address copied");
    } catch {
      showToast("Could not copy");
    }
  };

  return (
    <header className="shrink-0 bg-ivory-deep/95">
      <CopyToast message={toast ?? ""} visible={toast !== null} />

      <div className="flex items-end gap-2 border-b border-line/80 px-2 pt-2 md:px-3">
        <div className="flex shrink-0 items-center gap-1.5 px-1 pb-2" aria-hidden>
          <span className="size-3 rounded-full bg-[#d4a5a5]/90" />
          <span className="size-3 rounded-full bg-[#d4c4a5]/90" />
          <span className="size-3 rounded-full bg-[#a8c4b4]/90" />
        </div>
        <BrowserTabBar />
        <button
          type="button"
          aria-label="New tab — go home"
          onClick={() => navigate("home")}
          className="mb-1 flex size-7 shrink-0 items-center justify-center rounded-md text-charcoal-muted transition-colors hover:bg-ivory hover:text-charcoal"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-ivory px-2 py-2 md:gap-3 md:px-3">
        <div className="flex shrink-0 items-center">
          <ToolbarBtn label="Back" onClick={goBack} disabled={!canGoBack} />
          <ToolbarBtn
            label="Forward"
            onClick={goForward}
            disabled={!canGoForward}
          />
          <ToolbarBtn label="Reload" onClick={reload} />
          <ToolbarBtn label="Home" onClick={() => navigate("home")} />
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-1 rounded-full border border-line bg-ivory-deep/50 pl-3 pr-1 shadow-inner">
          <LockIcon />
          <span
            className="min-w-0 flex-1 truncate font-mono text-xs text-charcoal md:text-sm"
            aria-live="polite"
          >
            https://{routePath}
          </span>
          <button
            type="button"
            onClick={copyAddress}
            aria-label="Copy address"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-charcoal-muted transition-colors hover:bg-ivory hover:text-charcoal"
          >
            <CopyIcon />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 border-l border-line/80 pl-1 md:gap-1 md:pl-2">
          <RecruiterKit />

          <div className="relative">
            <button
              type="button"
              aria-expanded={appsOpen}
              aria-label="Apps and shortcuts"
              onClick={() => setAppsOpen((v) => !v)}
              className="flex size-8 items-center justify-center rounded-md text-charcoal-muted transition-colors hover:bg-ivory-deep hover:text-charcoal"
            >
              <GridIcon />
            </button>
            {appsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  aria-hidden
                  onClick={() => setAppsOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 grid w-48 grid-cols-2 gap-1 rounded-xl border border-line bg-ivory p-2 shadow-lg">
                  {sectionTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        navigate(tab.id as SectionId);
                        setAppsOpen(false);
                      }}
                      className="rounded-lg px-2 py-2 text-left text-xs font-medium text-charcoal transition-colors hover:bg-ivory-deep"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Bookmark — copy hiring brief"
            title="Copy hiring brief"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  buildHiringBrief(window.location.href),
                );
                showToast("Hiring brief copied");
              } catch {
                showToast("Copy failed");
              }
            }}
            className="flex size-8 items-center justify-center rounded-md text-charcoal-muted transition-colors hover:bg-ivory-deep hover:text-sage"
          >
            <StarIcon />
          </button>

          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="hidden size-8 items-center justify-center rounded-md text-charcoal-muted transition-colors hover:bg-ivory-deep hover:text-charcoal sm:flex"
          >
            <MailIcon />
          </a>

          <div className="hidden md:block">
            <BrandMark />
          </div>
        </div>
      </div>
    </header>
  );
}

function ToolbarBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-8 items-center justify-center rounded-md text-charcoal-muted transition-colors hover:bg-ivory-deep hover:text-charcoal disabled:cursor-default disabled:opacity-35"
    >
      {label === "Back" && <ChevronLeft />}
      {label === "Forward" && <ChevronRight />}
      {label === "Reload" && <ReloadIcon />}
      {label === "Home" && <HomeIcon />}
    </button>
  );
}

function LockIcon() {
  return (
    <svg className="size-3.5 shrink-0 text-sage" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1a4 4 0 00-4 4v1H3a1 1 0 000 2h1v4a2 2 0 002 2h4a2 2 0 002-2V8h1a1 1 0 100-2h-1V5a4 4 0 00-4-4zm2 5H6V5a2 2 0 114 0v1z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.2 4.4 13l.7-4L2.2 6.3l4-.6L8 2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M13 8a5 5 0 11-2.2-4.1M13 3v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 7.5L8 3l5 4.5V13a1 1 0 01-1 1h-3v-4H7v4H4a1 1 0 01-1-1V7.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
