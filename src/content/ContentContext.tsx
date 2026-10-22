import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultContent } from "./defaults";
import { loadContent } from "./load";
import type { SiteContent } from "./types";

type ContentValue = { content: SiteContent; preview: boolean };

const ContentContext = createContext<ContentValue>({ content: defaultContent, preview: false });

/**
 * Supplies the portfolio's text, links and projects to the public pages.
 * Built-in content renders immediately; CMS content replaces it once loaded.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ContentValue>({ content: defaultContent, preview: false });

  useEffect(() => {
    let cancelled = false;
    loadContent().then((loaded) => {
      if (!cancelled && loaded) setValue(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={value}>
      {children}
      {value.preview && <PreviewBadge />}
    </ContentContext.Provider>
  );
}

/** Only ever rendered for a signed-in admin who opened ?preview. */
function PreviewBadge() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-lg">
      <span className="size-2 rounded-full bg-[#f4bf4f]" aria-hidden />
      Preview — showing drafts and unpublished projects
      <a href="/" className="rounded-full bg-white/15 px-2.5 py-1 hover:bg-white/25">
        Exit
      </a>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return useContext(ContentContext).content;
}
