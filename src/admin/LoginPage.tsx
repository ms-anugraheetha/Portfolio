import { useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { sb } from "./api";
import { Button, Field } from "./ui";

/**
 * Admin sign-in. Email + password via Supabase Auth — there is deliberately
 * no sign-up or "create account" path here (sign-ups are also disabled in
 * Supabase itself; see ADMIN_SETUP.md).
 */
export function LoginPage({
  unconfigured,
  notice,
  onSignedIn,
}: {
  unconfigured?: boolean;
  notice?: string;
  onSignedIn: (session: Session) => Promise<string | null>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const client = await sb();
      const { data, error: authError } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError || !data.session) {
        setError(friendlyAuthError(authError?.message, authError?.status));
        return;
      }
      const problem = await onSignedIn(data.session);
      if (problem) setError(problem);
    } catch {
      setError("Couldn't reach the sign-in service. Check your connection and try again.");
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-frame p-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-paper shadow-[0_30px_80px_-20px_rgba(60,0,4,0.55)] ring-1 ring-black/10">
        <div className="flex items-center gap-3 border-b border-line bg-chrome px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ec5f57]" />
            <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
            <span className="size-2.5 rounded-full bg-[#61c454]" />
          </span>
          <span className="truncate text-xs text-ink-soft">
            anugraheetha.dev<span className="text-ink-muted">/admin/login</span>
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-cherry">
            <span className="mr-2">//</span>Admin
          </p>
          <h1 className="mt-2 font-display text-[2.6rem] uppercase leading-none text-[#160f10]">Sign in</h1>
          <p className="mt-2 text-sm text-ink-muted">Manage the content of your portfolio.</p>

          {unconfigured ? (
            <div className="mt-6 rounded-xl border border-line bg-blush/60 p-4 text-sm leading-relaxed text-ink" role="alert">
              <p className="font-semibold text-cherry-dark">The admin area isn't connected yet.</p>
              <p className="mt-1 text-ink-muted">
                Add <code className="rounded bg-white px-1">VITE_SUPABASE_URL</code> and{" "}
                <code className="rounded bg-white px-1">VITE_SUPABASE_ANON_KEY</code> to your environment, then
                restart the app. See <code className="rounded bg-white px-1">ADMIN_SETUP.md</code>.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              {notice && !error && (
                <p className="rounded-xl bg-chrome px-3 py-2 text-sm text-ink-muted" role="status">
                  {notice}
                </p>
              )}
              {error && (
                <p className="rounded-xl bg-blush px-3 py-2 text-sm font-medium text-cherry-dark" role="alert">
                  {error}
                </p>
              )}
              <Field
                label="Email"
                type="email"
                autoComplete="username"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Field
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" loading={loading} className="h-11 w-full">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          )}

          <a href="/" className="mt-6 inline-block text-sm text-ink-soft underline-offset-4 hover:text-cherry hover:underline">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </main>
  );
}

function friendlyAuthError(message = "", status?: number) {
  if (status === 429 || /rate limit|too many/i.test(message)) {
    return "Too many sign-in attempts. Please wait a minute and try again.";
  }
  if (/email not confirmed/i.test(message)) return "This email address hasn't been confirmed yet.";
  if (/invalid login credentials|invalid_grant/i.test(message) || status === 400) {
    return "That email and password don't match an admin account.";
  }
  if (!status) return "Couldn't reach the sign-in service. Check your connection and try again.";
  return "Sign-in failed. Please try again.";
}
