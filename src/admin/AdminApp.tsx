import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { isCmsConfigured } from "@/lib/supabase";
import { sb } from "./api";
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./Dashboard";
import { Spinner, ToastProvider } from "./ui";

export const LOGIN_PATH = "/admin/login";
export const DASHBOARD_PATH = "/admin";

type Auth =
  | { status: "checking" }
  | { status: "signed-out"; notice?: string }
  | { status: "admin"; session: Session };

/**
 * /admin and /admin/login. Real protection lives in the database (RLS); this
 * component only decides which screen to show:
 *   • no session            → login
 *   • session, not an admin → signed out again, with an explanation
 *   • admin session         → dashboard
 * Expired or revoked sessions drop back to login automatically.
 */
export default function AdminApp() {
  const [path, setPath] = useState(() => normalise(window.location.pathname));
  const [auth, setAuth] = useState<Auth>({ status: "checking" });
  const manualSignOut = useRef(false);

  const go = useCallback((to: string, replace = false) => {
    if (window.location.pathname !== to) {
      window.history[replace ? "replaceState" : "pushState"](null, "", to);
    }
    setPath(to);
  }, []);

  useEffect(() => {
    const onPop = () => setPath(normalise(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /** Confirms the session against the server and the admin allow-list. */
  const verify = useCallback(async (session: Session | null): Promise<Auth> => {
    if (!session) return { status: "signed-out" };
    const client = await sb();
    const { data, error } = await client.rpc("is_admin");
    if (error) {
      await client.auth.signOut({ scope: "local" });
      return { status: "signed-out", notice: "Your session has expired. Please sign in again." };
    }
    if (data !== true) {
      await client.auth.signOut({ scope: "local" });
      return { status: "signed-out", notice: "This account doesn't have admin access." };
    }
    return { status: "admin", session };
  }, []);

  useEffect(() => {
    if (!isCmsConfigured) return;
    let unsub = () => {};
    let alive = true;
    sb().then(async (client) => {
      const { data } = await client.auth.getSession();
      const result = await verify(data.session);
      if (alive) setAuth(result);
      const sub = client.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          const notice = manualSignOut.current ? "You've been signed out." : "Your session has expired. Please sign in again.";
          manualSignOut.current = false;
          setAuth((prev) => (prev.status === "admin" || prev.status === "checking" ? { status: "signed-out", notice } : prev));
        } else if (event === "TOKEN_REFRESHED" && session) {
          setAuth((prev) => (prev.status === "admin" ? { status: "admin", session } : prev));
        }
      });
      unsub = () => sub.data.subscription.unsubscribe();
    });
    return () => {
      alive = false;
      unsub();
    };
  }, [verify]);

  // Route guard: keep the URL in step with the auth state.
  useEffect(() => {
    if (auth.status === "checking") return;
    if (auth.status === "admin" && path !== DASHBOARD_PATH) go(DASHBOARD_PATH, true);
    if (auth.status === "signed-out" && path !== LOGIN_PATH) go(LOGIN_PATH, true);
  }, [auth.status, path, go]);

  useEffect(() => {
    document.title = path === LOGIN_PATH ? "Sign in · anu.exe" : "Admin · anu.exe";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [path]);

  const onSignedIn = useCallback(
    async (session: Session) => {
      const result = await verify(session);
      setAuth(result);
      return result.status === "admin" ? null : ("notice" in result && result.notice ? result.notice : "Sign-in failed.");
    },
    [verify],
  );

  const signOut = useCallback(async () => {
    manualSignOut.current = true;
    const client = await sb();
    await client.auth.signOut();
    setAuth({ status: "signed-out", notice: "You've been signed out." });
  }, []);

  const onSessionExpired = useCallback(async () => {
    const client = await sb();
    await client.auth.signOut({ scope: "local" });
    setAuth({ status: "signed-out", notice: "Your session has expired. Please sign in again." });
  }, []);

  if (!isCmsConfigured) return <LoginPage unconfigured onSignedIn={onSignedIn} />;

  if (auth.status === "checking") {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-paper text-cherry" role="status">
        <Spinner className="size-6" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  return (
    <ToastProvider>
      {auth.status === "admin" ? (
        <Dashboard session={auth.session} onSignOut={signOut} onSessionExpired={onSessionExpired} />
      ) : (
        <LoginPage notice={auth.notice} onSignedIn={onSignedIn} />
      )}
    </ToastProvider>
  );
}

function normalise(p: string) {
  const trimmed = p.replace(/\/+$/, "") || "/";
  return trimmed === LOGIN_PATH ? LOGIN_PATH : DASHBOARD_PATH;
}
