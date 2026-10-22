import { useEffect, useRef } from "react";
import { sectionTabs } from "@/data/routes";
import { useWorkspace } from "@/context/WorkspaceContext";
import { TabGlyph } from "@/components/ui/Icons";

export function BrowserTabBar() {
  const { activeSection, navigate } = useWorkspace();
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the active tab in view when tabs overflow (mobile).
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-tab="${activeSection}"]`,
    );
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeSection]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next =
      sectionTabs[(index + dir + sectionTabs.length) % sectionTabs.length];
    navigate(next.id);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)
      ?.focus();
  };

  return (
    <div className="relative min-w-0 flex-1">
      <div
        ref={listRef}
        className="no-scrollbar flex items-end overflow-x-auto"
        role="tablist"
        aria-label="Portfolio pages"
      >
        {sectionTabs.map((tab, i) => {
          const isActive = activeSection === tab.id;
          const prevActive = sectionTabs[i - 1]?.id === activeSection;
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              title={tab.tabTitle}
              onClick={() => navigate(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group relative flex h-9 shrink-0 items-center gap-2 rounded-t-[10px] px-3 text-left text-[13px] transition-colors md:h-10 md:px-3.5 ${
                isActive
                  ? "z-10 bg-paper font-semibold text-ink shadow-[0_-1px_0_0_var(--color-line)]"
                  : "text-ink-muted hover:bg-chrome-deep/70 hover:text-ink"
              } ${isActive ? "min-w-[8.5rem] md:min-w-[11rem]" : "w-11 justify-center sm:w-auto sm:min-w-[7rem] sm:justify-start md:min-w-[9rem]"} max-w-[15rem]`}
            >
              {/* Divider between inactive tabs, like a real browser */}
              {!isActive && i > 0 && !prevActive && (
                <span
                  className="absolute left-0 top-2.5 h-4 w-px bg-ink-soft/30"
                  aria-hidden
                />
              )}
              {isActive && (
                <>
                  <span
                    className="absolute -left-2.5 bottom-0 size-2.5 bg-[radial-gradient(circle_at_0_0,transparent_10px,var(--color-paper)_10.5px)]"
                    aria-hidden
                  />
                  <span
                    className="absolute -right-2.5 bottom-0 size-2.5 bg-[radial-gradient(circle_at_100%_0,transparent_10px,var(--color-paper)_10.5px)]"
                    aria-hidden
                  />
                </>
              )}
              <TabGlyph
                icon={tab.icon}
                className={`size-4 shrink-0 ${isActive ? "text-cherry" : "text-ink-soft group-hover:text-cherry"}`}
              />
              <span
                className={`truncate ${isActive ? "" : "hidden sm:inline"}`}
              >
                {tab.tabTitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
