/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

/* ───────────── Buttons ───────────── */

type Variant = "primary" | "secondary" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary:
    "bg-cherry text-white shadow-[0_8px_18px_-10px_rgba(196,22,28,0.85)] hover:bg-cherry-dark disabled:bg-cherry/50",
  secondary: "border-[1.5px] border-line bg-paper text-ink hover:border-cherry hover:text-cherry",
  ghost: "text-ink-muted hover:bg-blush hover:text-cherry",
  danger: "border-[1.5px] border-cherry/40 bg-paper text-cherry hover:bg-cherry hover:text-white",
};

export function Button({
  variant = "secondary",
  size = "md",
  loading,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md";
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      {...rest}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${
        size === "sm" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-sm"
      } ${variants[variant]} ${focusRing} ${className}`}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function Spinner({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────── Fields ───────────── */

const inputClass =
  "w-full rounded-[10px] border border-line bg-white px-3 py-2 text-[15px] text-ink placeholder:text-ink-soft/70 transition-colors focus:border-cherry focus:outline-none focus:ring-2 focus:ring-cherry/20 aria-[invalid=true]:border-cherry";

export function Field({
  label,
  hint,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? `${id}-d` : undefined}
        className={inputClass}
      />
      {(error || hint) && (
        <p id={`${id}-d`} className={`mt-1 text-xs ${error ? "text-cherry" : "text-ink-soft"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  hint,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <textarea id={id} rows={3} {...rest} className={`${inputClass} resize-y leading-relaxed`} />
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-ink">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ───────────── Layout bits ───────────── */

export function Card({ title, actions, children }: { title?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-5 md:p-6">
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {title && <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-cherry">{title}</h3>}
          {actions}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Badge({ tone, children }: { tone: "live" | "draft" | "dirty" | "muted"; children: ReactNode }) {
  const tones = {
    live: "bg-[#e7f4e9] text-[#2d6b37]",
    draft: "bg-[#fdf1d8] text-[#8a5a00]",
    dirty: "bg-blush text-cherry-dark",
    muted: "bg-chrome text-ink-muted",
  };
  const dots = { live: "bg-[#3f9a4e]", draft: "bg-[#e0a526]", dirty: "bg-cherry", muted: "bg-ink-soft" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      <span className={`size-1.5 rounded-full ${dots[tone]}`} aria-hidden />
      {children}
    </span>
  );
}

/** Up / down / remove controls for an item in an editable list. */
export function RowControls({
  index,
  count,
  onMove,
  onRemove,
  label,
}: {
  index: number;
  count: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <IconButton label={`Move ${label} up`} disabled={index === 0} onClick={() => onMove(index, index - 1)}>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </IconButton>
      <IconButton label={`Move ${label} down`} disabled={index === count - 1} onClick={() => onMove(index, index + 1)}>
        <path d="M12 5v14M6 13l6 6 6-6" />
      </IconButton>
      <IconButton label={`Remove ${label}`} onClick={onRemove} danger>
        <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />
      </IconButton>
    </div>
  );
}

export function IconButton({
  label,
  children,
  danger,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...rest}
      className={`flex size-8 items-center justify-center rounded-lg text-ink-muted transition-colors disabled:pointer-events-none disabled:opacity-30 ${
        danger ? "hover:bg-blush hover:text-cherry" : "hover:bg-chrome hover:text-ink"
      } ${focusRing}`}
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}

export function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ───────────── Toasts ───────────── */

type Toast = { id: number; tone: "success" | "error"; text: string };
const ToastContext = createContext<(tone: Toast["tone"], text: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((tone: Toast["tone"], text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, tone, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === "error" ? 7000 : 3500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex max-w-md items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
              t.tone === "success" ? "bg-ink text-white" : "bg-cherry text-white"
            }`}
          >
            <span aria-hidden>{t.tone === "success" ? "✓" : "!"}</span>
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export function isHttpsUrl(v: string) {
  if (!v) return true;
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
}
