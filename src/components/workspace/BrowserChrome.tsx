import { useState } from "react";
import { useContent } from "@/content/ContentContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { BrowserTabBar } from "./BrowserTabBar";
import { RecruiterKit } from "./RecruiterKit";
import { CopyToast } from "@/components/ui/CopyToast";
import { MailIcon } from "@/components/ui/Icons";

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
  const { contact } = useContent();

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

  const [host, ...rest] = routePath.split("/");
  const path = rest.length ? `/${rest.join("/")}` : "";

  return (
    <header className="shrink-0 bg-chrome">
      <CopyToast message={toast ?? ""} visible={toast !== null} />

      {/* Title bar: window dots + tabs */}
      <div className="flex items-end gap-1 px-2 pt-2 md:gap-2 md:px-3">
        <div
          className="hidden shrink-0 items-center gap-2 self-center px-1.5 pb-1 sm:flex"
          aria-hidden
        >
          <span className="size-3 rounded-full bg-[#ec5f57] ring-1 ring-black/10" />
          <span className="size-3 rounded-full bg-[#f4bf4f] ring-1 ring-black/10" />
          <span className="size-3 rounded-full bg-[#61c454] ring-1 ring-black/10" />
        </div>
        <BrowserTabBar />
      </div>

      {/* Toolbar: navigation + address bar */}
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-2 py-1.5 md:gap-3 md:px-3 md:py-2">
        <div className="flex shrink-0 items-center">
          <ToolbarBtn label="Back" onClick={goBack} disabled={!canGoBack}>
            <ChevronLeft />
          </ToolbarBtn>
          <ToolbarBtn
            label="Forward"
            onClick={goForward}
            disabled={!canGoForward}
            className="hidden sm:flex"
          >
            <ChevronRight />
          </ToolbarBtn>
          <ToolbarBtn label="Reload page" onClick={reload}>
            <ReloadIcon />
          </ToolbarBtn>
          <ToolbarBtn
            label="Home"
            onClick={() => navigate("home")}
            className="hidden sm:flex"
          >
            <HomeIcon />
          </ToolbarBtn>
        </div>

        <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full bg-chrome/80 pl-3.5 pr-1 ring-1 ring-line transition-shadow focus-within:ring-cherry-light">
          <LockIcon />
          <span
            className="min-w-0 flex-1 truncate text-[13px] text-ink-soft md:text-sm"
            aria-live="polite"
            aria-label={`Address: https://${routePath}`}
          >
            <span className="text-ink">{host}</span>
            {path}
          </span>
          <button
            type="button"
            onClick={copyAddress}
            aria-label="Copy address"
            title="Copy address"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-cherry"
          >
            <CopyIcon />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 md:gap-1">
          <RecruiterKit />
          <a
            href={`mailto:${contact.email}`}
            aria-label={`Email ${contact.shortName}`}
            title="Email"
            className="hidden size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-cherry-muted/60 hover:text-cherry sm:flex"
          >
            <MailIcon className="size-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}

function ToolbarBtn({
  label,
  onClick,
  disabled,
  className = "",
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-cherry-muted/60 hover:text-cherry disabled:pointer-events-none disabled:opacity-30 ${className}`}
    >
      {children}
    </button>
  );
}

function LockIcon() {
  return (
    <svg className="size-3.5 shrink-0 text-ink-soft" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
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

function ChevronLeft() {
  return (
    <svg className="size-[18px]" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M13 8H3.5M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="size-[18px]" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M13 8a5 5 0 11-1.6-3.7M13 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
