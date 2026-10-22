import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CatIcon } from "@/components/ui/Icons";

const CLICKS_NEEDED = 5;
const WINDOW_MS = 3000;
const ADMIN_LOGIN_PATH = "/admin/login";

/**
 * The Home tab's cat icon. Looks and behaves exactly like the other tab
 * icons, except that five clicks within three seconds open the admin login.
 *
 * This is only a shortcut to a page — NOT a security control. The admin
 * area is protected by Supabase Auth and database Row Level Security.
 *
 *  • Click 1 bubbles to the tab as usual (normal navigation).
 *  • Clicks 2–5 inside the window are swallowed so the tab doesn't re-fire.
 *  • The window restarts if three seconds pass before the fifth click.
 */
export function SecretCat({ className }: { className?: string }) {
  const count = useRef(0);
  const startedAt = useRef(0);
  const resetTimer = useRef<number | undefined>(undefined);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const reset = () => {
    count.current = 0;
    window.clearTimeout(resetTimer.current);
  };

  const onClick = (e: MouseEvent) => {
    const now = performance.now();
    if (count.current > 0 && now - startedAt.current > WINDOW_MS) reset();

    if (count.current === 0) {
      startedAt.current = now;
      resetTimer.current = window.setTimeout(reset, WINDOW_MS);
    } else {
      e.stopPropagation(); // don't re-trigger the tab while counting
    }
    count.current += 1;

    if (count.current >= CLICKS_NEEDED) {
      reset();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        window.location.assign(ADMIN_LOGIN_PATH);
        return;
      }
      setCelebrate(true);
      window.setTimeout(() => window.location.assign(ADMIN_LOGIN_PATH), 520);
    }
  };

  return (
    <span
      onClick={onClick}
      // Invisible padding enlarges the tap target without moving anything.
      className="relative -m-1.5 inline-flex shrink-0 touch-manipulation p-1.5"
      data-secret-cat=""
    >
      <CatIcon
        className={`${className ?? ""} ${celebrate ? "animate-[cat-wiggle_0.5s_ease-in-out]" : ""}`}
      />
      {celebrate && (
        <svg
          className="pointer-events-none absolute -right-0.5 -top-1 size-2.5 animate-[cat-heart_0.55s_ease-out_forwards] text-cherry"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 21s-8-4.9-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6.1-8 11-8 11Z" />
        </svg>
      )}
    </span>
  );
}
