import { lazy, Suspense } from "react";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { BrowserShell } from "@/components/workspace/BrowserShell";
import { ContentProvider } from "@/content/ContentContext";

/** The admin area is a separate chunk — visitors never download it. */
const AdminApp = lazy(() => import("@/admin/AdminApp"));

const isAdminPath = /^\/admin(\/|$)/.test(window.location.pathname);

function App() {
  if (isAdminPath) {
    return (
      <Suspense fallback={<div className="min-h-[100dvh] bg-frame" />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <ContentProvider>
      <WorkspaceProvider>
        <BrowserShell />
      </WorkspaceProvider>
    </ContentProvider>
  );
}

export default App;
