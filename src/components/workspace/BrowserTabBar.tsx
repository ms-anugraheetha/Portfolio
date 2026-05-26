import { sectionTabs } from "@/data/routes";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { SectionId } from "@/types/workspace";

export function BrowserTabBar() {
  const { activeSection, navigate } = useWorkspace();

  return (
    <div
      className="flex min-w-0 flex-1 items-end gap-0.5 overflow-x-auto pl-2"
      role="tablist"
      aria-label="Open pages"
    >
      {sectionTabs.map((tab) => {
        const isActive = activeSection === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => navigate(tab.id as SectionId)}
            className={`group relative flex max-w-[11rem] min-w-[5.5rem] shrink-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-left text-xs transition-colors md:max-w-[13rem] md:text-sm ${
              isActive
                ? "z-10 border-line bg-ivory text-charcoal"
                : "border-transparent bg-ivory-deep/70 text-charcoal-muted hover:bg-ivory-deep hover:text-charcoal"
            }`}
          >
            <span
              className={`size-2 shrink-0 rounded-full ${
                isActive ? "bg-sage" : "bg-charcoal-soft/40"
              }`}
              aria-hidden
            />
            <span className="truncate font-medium">{tab.tabTitle}</span>
            {!isActive && (
              <span
                className="ml-auto hidden size-4 shrink-0 items-center justify-center rounded hover:bg-line/80 sm:group-hover:flex"
                aria-hidden
              >
                ×
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
