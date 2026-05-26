import { BrowserChrome } from "./BrowserChrome";
import { WorkspaceViewport } from "./WorkspaceViewport";

export function BrowserShell() {
  return (
    <div className="flex min-h-screen flex-col bg-[#e8e4dc] px-2 py-3 md:px-5 md:py-6">
      <div className="mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-line/90 bg-ivory-deep shadow-[0_24px_80px_-20px_rgba(44,44,42,0.22)] md:h-[calc(100vh-3rem)] md:rounded-2xl">
        <BrowserChrome />
        <WorkspaceViewport />
      </div>
    </div>
  );
}
