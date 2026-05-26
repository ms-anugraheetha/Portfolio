import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { buildHiringBrief, openAllLiveDemos } from "@/lib/hiringBrief";
import { CopyToast } from "@/components/ui/CopyToast";

export function RecruiterKit() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(buildHiringBrief(window.location.href));
      showToast("Hiring brief copied — ready to paste");
      setOpen(false);
    } catch {
      showToast("Copy failed — try again");
    }
  };

  const copyUrl = async () => {
    try {
      const url =
        window.location.hostname === "localhost"
          ? "https://anugraheetha.dev"
          : window.location.href;
      await navigator.clipboard.writeText(url);
      showToast("Portfolio link copied");
      setOpen(false);
    } catch {
      showToast("Copy failed — try again");
    }
  };

  const actionBtnClass =
    "w-full rounded-lg border border-line bg-ivory py-2.5 text-center text-sm font-medium text-charcoal transition-colors hover:border-sage hover:bg-sage-muted/30";

  return (
    <div className="relative" ref={panelRef}>
      <CopyToast message={toast ?? ""} visible={toast !== null} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        title="Recruiter kit — copy brief, open demos"
        className={`relative flex h-8 items-center gap-1.5 rounded-md px-2 text-charcoal transition-colors md:px-2.5 ${
          open
            ? "bg-sage-muted text-charcoal"
            : "hover:bg-ivory-deep"
        }`}
      >
        <svg
          className="size-4 shrink-0 text-sage"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 2h8l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M14 2v4h4M7 10h6M7 13h4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="hidden text-xs font-medium lg:inline">Recruiter</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Recruiter quick actions"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-line bg-ivory p-4 shadow-lg"
        >
          <p className="font-heading text-sm font-semibold text-charcoal">
            Short on time?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-charcoal-muted">
            One-click tools to review this candidate no digging through tabs.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={copyBrief}
              className={actionBtnClass}
            >
              Copy hiring brief
            </button>
            <button
              type="button"
              onClick={() => {
                openAllLiveDemos();
                showToast("Opening live demos…");
                setOpen(false);
              }}
              className={actionBtnClass}
            >
              Open all live demos
            </button>
            <button
              type="button"
              onClick={copyUrl}
              className={actionBtnClass}
            >
              Copy portfolio link
            </button>
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal-soft">
              Quick contact
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${site.email}`}
                className="rounded-md bg-ivory-deep px-2.5 py-1 text-xs font-medium text-charcoal hover:text-sage"
              >
                Email
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-ivory-deep px-2.5 py-1 text-xs font-medium text-charcoal hover:text-sage"
              >
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-ivory-deep px-2.5 py-1 text-xs font-medium text-charcoal hover:text-sage"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
