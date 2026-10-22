import { BrowserChrome } from "./BrowserChrome";
import { WorkspaceViewport } from "./WorkspaceViewport";

export function BrowserShell() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-frame p-1.5 sm:p-3 md:p-5">
      <div className="mx-auto flex h-[calc(100dvh-0.75rem)] w-full max-w-[1400px] flex-col overflow-hidden rounded-xl bg-chrome shadow-[0_30px_80px_-20px_rgba(60,0,4,0.55)] ring-1 ring-black/10 sm:h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-2.5rem)] md:rounded-2xl">
        <BrowserChrome />
        <WorkspaceViewport />
      </div>
    </div>
  );
}
