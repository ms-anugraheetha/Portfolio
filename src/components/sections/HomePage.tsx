import type { ReactNode } from "react";
import { useContent } from "@/content/ContentContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CodeIcon,
  DownloadIcon,
  MailIcon,
} from "@/components/ui/Icons";

/* Shared focus treatment for every interactive element on the hero. */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  const { navigate } = useWorkspace();
  const { home, contact } = useContent();

  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-paper">
      {/* Container-query root: the name, the illustration and the accents
          are all sized in cqi so the composition scales as one piece. */}
      <div className="@container relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-5 pb-10 pt-6 sm:px-8 md:px-10 md:pt-9 lg:px-14 lg:pb-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.32em] text-ink md:text-[13px]">
          <span className="shrink-0">
            <span className="text-ink-soft">//</span> {home.greeting}
          </span>
          <span className="relative hidden h-px max-w-[26rem] flex-1 bg-ink/70 sm:block" aria-hidden>
            <span className="absolute -right-1 -top-[3px] size-[7px] rounded-full bg-ink" />
          </span>
          <span className="hidden flex-1 lg:block" aria-hidden />
          <span className="hidden items-center gap-3 lg:flex" aria-hidden>
            <span className="h-px w-32 bg-ink/70" />
            <span className="font-bold tracking-[0.18em] text-cherry">////</span>
          </span>
        </div>

        {/* Name + illustration */}
        <div className="relative mt-4 flex flex-col md:mt-6 lg:block">

          <Sparkle className="absolute -left-[1.4rem] top-[5.5cqi] z-20 hidden size-[3.4cqi] text-cherry lg:block" />
          <svg
            className="pointer-events-none absolute -left-[1.6rem] top-[11cqi] z-20 hidden w-[9cqi] text-cherry lg:block"
            viewBox="0 0 120 50"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 44c18-14 70-38 104-36 8 1 6 9-6 13-30 10-70 14-86 10-8-2-6-8 4-12"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>

          <h1
            aria-label={`${home.headingLine1} ${home.headingLine2}`}
            className="relative z-10 font-display uppercase leading-[0.86] tracking-[-0.005em] text-[#160f10] text-[clamp(3.4rem,16.6cqi,15.5rem)]"
          >
            <span aria-hidden className="block whitespace-nowrap">
              {home.headingLine1}
            </span>
            <span aria-hidden className="block whitespace-nowrap">
              {home.headingLine2}
            </span>
          </h1>

          {/* Squiggle trailing off "Bin Saj" */}
          <svg
            className="pointer-events-none absolute left-[44.5cqi] top-[26.5cqi] z-20 hidden w-[11cqi] text-cherry lg:block"
            viewBox="0 0 160 40"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 34c10-6 18-22 26-22s4 20 14 20 12-24 22-24 6 22 16 22 12-20 22-20 8 14 16 14 18-6 34-8"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Character + kitten */}
          <div className="relative z-20 order-last mx-auto mt-10 w-[min(72vw,320px)] lg:absolute lg:order-none lg:right-[5cqi] lg:top-[3cqi] lg:mt-0 lg:w-[31cqi]">
            <img
              src="/art/anu-character.png"
              alt="Illustration of Anu in a white tee and black shorts with her kitten"
              width={387}
              height={584}
              className="relative h-auto w-full select-none"
              draggable={false}
            />
            {/* little "pop" lines by her head + one sparkle */}
            <svg
              className="absolute -right-[4%] top-[18%] w-[16%] text-cherry"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden
            >
              <path d="M8 4l6 12M22 2l-1 13M33 12l-10 8" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
            </svg>
            <Sparkle className="absolute -right-[16%] top-[44%] hidden w-[13%] text-cherry lg:block" />
          </div>

          {/* Intro + actions — sits under "Bin Saj", left of the illustration */}
          <div className="relative z-20 mt-6 max-w-[34rem] md:mt-8 lg:mt-[2.6cqi] lg:max-w-[46cqi]">
            <p className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-cherry md:text-[13px]">
              {home.title}
            </p>
            <p className="mt-3 max-w-[32rem] text-[15px] leading-[1.7] text-ink-muted md:text-[17px] lg:max-w-[38cqi]">
              {home.intro}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => navigate("projects")}
                className={`group inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-cherry px-4 font-mono text-[14px] sm:h-[52px] sm:gap-3 sm:px-6 sm:text-[15px] font-bold text-white shadow-[0_10px_24px_-12px_rgba(196,22,28,0.8)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-cherry-dark active:translate-y-0 motion-safe:hover:-translate-y-px ${focusRing}`}
              >
                {home.ctaLabel}
                <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              {home.cvUrl && (
                <a
                  href={home.cvUrl}
                  download
                  className={`inline-flex h-[52px] items-center gap-3 rounded-[10px] border-[1.5px] border-cherry bg-paper px-6 font-mono text-[15px] font-bold text-cherry transition-colors duration-200 hover:bg-blush ${focusRing}`}
                >
                  Download CV
                  <DownloadIcon className="size-5" />
                </a>
              )}
              <SocialSquare href={contact.github} label="GitHub" external>
                <CodeIcon className="size-5" />
              </SocialSquare>
              <SocialSquare href={contact.linkedin} label="LinkedIn" external>
                <BriefcaseIcon className="size-5" />
              </SocialSquare>
              <SocialSquare href={`mailto:${contact.email}`} label="Email">
                <MailIcon className="size-5" />
              </SocialSquare>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Four-point sparkle used as a small red accent. */
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0z" />
    </svg>
  );
}

function SocialSquare({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex size-12 items-center justify-center rounded-[10px] sm:size-[52px] border-[1.5px] border-cherry/70 bg-paper text-cherry transition-colors duration-200 hover:border-cherry hover:bg-cherry hover:text-white ${focusRing}`}
    >
      {children}
    </a>
  );
}
