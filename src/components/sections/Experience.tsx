import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { PinIcon } from "@/components/ui/Icons";
import { fadeUp, staggerContainer } from "@/lib/motion";

const pad = (n: number) => String(n).padStart(2, "0");

export function Experience() {
  const {
    experience: { achievements },
    about: { education },
  } = useContent();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-14 pt-8 md:px-10 md:pt-10">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* ───────── Education ───────── */}
        <motion.header variants={fadeUp}>
          <Eyebrow label="Education" />
          <Heading>Where I&apos;ve studied</Heading>
        </motion.header>

        <motion.div variants={fadeUp} className="relative mt-6 lg:mt-8">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {education.map((item, i) => {
              const diploma = /diploma|certificate/i.test(item.degree);
              return (
                <li
                  key={`${item.degree}-${i}`}
                  className="relative flex gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors duration-200 hover:border-cherry-light/50 md:p-6"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-cherry shadow-[0_6px_14px_-10px_rgba(80,10,14,0.5)]">
                    {diploma ? <DocIcon /> : <CapIcon />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="pr-6 font-heading text-[17px] font-bold leading-snug text-ink">{item.degree}</p>
                    <p className="mt-0.5 text-[15px] text-ink-soft">{item.school}</p>
                    <p className="mt-3 flex flex-col gap-1 text-[13px] text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon />
                        {item.period.replace(" - ", " – ")}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <PinIcon className="size-4 text-cherry" />
                        {item.location}
                      </span>
                    </p>
                  </div>
                  <span className="absolute right-5 top-5 text-xs tabular-nums text-ink-soft" aria-hidden>
                    {pad(i + 1)}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* ───────── Programmes & achievements ───────── */}
        <motion.header variants={fadeUp} className="mt-14">
          <Eyebrow label="Programmes & achievements" />
          <Heading>Programmes &amp; milestones</Heading>
        </motion.header>

        <motion.ol variants={fadeUp} className="mt-6">
          {achievements.map((a, i) => {
            const last = i === achievements.length - 1;
            return (
              <li key={`${a.title}-${i}`} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[6.5rem_2.5rem_minmax(0,1fr)] sm:gap-x-4">
                <span className="hidden pt-0.5 text-right text-[15px] tabular-nums text-ink-muted sm:block">{a.period}</span>
                {/* Dot + rail */}
                <span className="relative flex justify-center" aria-hidden>
                  <span className="relative z-10 mt-1.5 size-4 rounded-full bg-cherry ring-4 ring-paper" />
                  <span className={`absolute left-1/2 top-2 w-[2px] -translate-x-1/2 bg-cherry/80 ${last ? "h-[calc(100%-0.25rem)]" : "h-full"}`} />
                </span>
                <div className={`flex flex-wrap items-start justify-between gap-x-6 gap-y-2 pb-5 ${last ? "" : "mb-5 border-b border-line"}`}>
                  <div className="min-w-0 flex-1 basis-80">
                    {a.period && <p className="text-sm tabular-nums text-ink-soft sm:hidden">{a.period}</p>}
                    <p className="font-heading text-[17px] font-bold text-ink">{a.title}</p>
                    {a.detail && <p className="mt-0.5 text-[15px] text-ink-muted">{a.detail}</p>}
                    {a.description && <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{a.description}</p>}
                  </div>
                  {a.status && (
                    <span className="shrink-0 rounded-full border border-cherry/25 bg-blush px-3.5 py-1 text-sm font-medium text-cherry">
                      {a.status}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </motion.ol>
      </motion.div>
    </div>
  );
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-ink-muted md:text-[13px]">
      <span className="shrink-0">
        <span className="mr-2 text-cherry">//</span>
        {label}
      </span>
      <span className="relative hidden h-px max-w-[27rem] flex-1 bg-cherry/80 sm:block" aria-hidden>
        <span className="absolute -right-1.5 -top-[5px] size-[11px] rounded-full border-2 border-cherry bg-paper" />
      </span>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] tracking-[-0.005em] text-[#160f10] sm:text-[3.4rem] md:text-[4.2rem]">
      {children}
      <span className="text-cherry">.</span>
    </h2>
  );
}

function CapIcon() {
  return (
    <svg className="size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 4 1.5 9 12 14l8-3.8V16h1.5V9z" />
      <path d="M5.5 12.2v3.6C5.5 17.6 8.4 19 12 19s6.5-1.4 6.5-3.2v-3.6L12 15.3z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M8.5 12.5h7M8.5 15.5h4" />
      <circle cx="15.5" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="size-4 text-cherry" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}
