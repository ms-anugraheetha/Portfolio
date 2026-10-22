import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { BriefcaseIcon, MailIcon, PinIcon } from "@/components/ui/Icons";

export function About() {
  const { about, contact } = useContent();
  const [first, ...rest] = about.paragraphs;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-14 pt-8 md:px-10 md:pt-10">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Eyebrow — same rule as Home and Projects */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-cherry md:text-[13px]"
        >
          <span className="shrink-0">
            <span className="mr-2">//</span>About
          </span>
          <span className="relative hidden h-px max-w-[31rem] flex-1 bg-cherry/80 sm:block" aria-hidden>
            <span className="absolute -right-1 -top-[3px] size-[7px] rounded-full bg-cherry" />
          </span>
          <span className="hidden flex-1 lg:block" aria-hidden />
          <span className="hidden items-center gap-4 lg:flex" aria-hidden>
            <span className="h-px w-24 bg-ink/40" />
            <span className="font-bold tracking-[0.2em]">////</span>
          </span>
        </motion.div>

        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
          {/* Heading + story */}
          <motion.div variants={fadeUp}>
            <div className="relative inline-flex items-center">
              <Sparkle className="absolute -left-8 top-1/2 hidden size-6 -translate-y-1/2 md:block" />
              <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] tracking-[-0.005em] text-[#160f10] sm:text-[3.4rem] md:text-[4.2rem]">
                {about.heading}
              </h2>
              <PopLines className="ml-4 h-9 w-8 shrink-0 md:h-11 md:w-9" />
            </div>

            <div className="mt-5 max-w-[40rem] text-[16px] leading-[1.75] text-ink-muted md:text-[17px]">
              {first && <p>{first}</p>}
              {rest.length > 0 && <hr className="my-4 border-line" />}
              {rest.map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Girl + kitten peeking over a quick-facts card */}
          <motion.aside variants={fadeUp} aria-label="Quick facts" className="relative lg:pt-2">
            <div className="relative mx-auto w-[min(78%,300px)] lg:w-[88%]">
              <PopLines className="absolute -left-[6%] top-[22%] h-[22%] w-[13%] -scale-x-100" />
              <img
                src="/art/peek-girl-cat.webp"
                alt=""
                width={900}
                height={416}
                draggable={false}
                className="relative z-10 -mb-[5px] h-auto w-full select-none"
              />
            </div>
            <dl className="relative rounded-2xl border border-line bg-paper-deep/40 p-5 md:p-6">
              <Fact icon={<PinIcon className="size-[18px]" />} label="Based in">
                {contact.location}
              </Fact>
              <Fact icon={<GradIcon />} label="Studying">
                {about.studying}
              </Fact>
              <Fact icon={<BriefcaseIcon className="size-[18px]" />} label="Status">
                {about.status}
              </Fact>
              <Fact icon={<MailIcon className="size-[18px]" />} label="Email">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all underline-offset-4 hover:text-cherry hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
                >
                  {contact.email}
                </a>
              </Fact>
            </dl>
          </motion.aside>
        </div>

        {/* Education */}
        <motion.section variants={fadeUp} aria-labelledby="about-education" className="mt-12">
          <h3
            id="about-education"
            className="text-xs font-bold uppercase tracking-[0.2em] text-cherry md:text-[13px]"
          >
            Education
          </h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {about.education.map((item) => (
              <li
                key={item.degree}
                className="flex gap-4 rounded-2xl border border-line bg-paper-deep/40 p-5 transition-colors duration-200 hover:border-cherry-light/50 md:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush text-cherry">
                  <GradIcon className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-lg font-bold leading-snug text-ink">{item.degree}</p>
                  <p className="mt-0.5 text-[15px] text-ink-soft">{item.school}</p>
                  <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
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
              </li>
            ))}
          </ul>
        </motion.section>

        {/* How I work */}
        <motion.section variants={fadeUp} aria-labelledby="about-work" className="mt-12">
          <h3
            id="about-work"
            className="text-xs font-bold uppercase tracking-[0.2em] text-cherry md:text-[13px]"
          >
            How I work
          </h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {about.principles.map((item, i) => (
              <li key={item.title} className="rounded-2xl border border-line bg-paper-deep/40 p-5 md:p-6">
                <span className="font-heading text-sm font-extrabold tabular-nums text-cherry">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-heading text-base font-bold text-ink">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </motion.section>
      </motion.div>
    </div>
  );
}

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-cherry">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">{label}</dt>
        <dd className="text-[15px] text-ink">{children}</dd>
      </div>
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={`text-cherry ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0z" />
    </svg>
  );
}

function PopLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`text-cherry ${className}`} viewBox="0 0 28 36" fill="none" aria-hidden>
      <path d="M8 9 17 3M8 18h14M8 27l9 6" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function GradIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" />
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
