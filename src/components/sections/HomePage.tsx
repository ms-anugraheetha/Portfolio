import type { ReactNode } from "react";
import { site, homeHero } from "@/data/site";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CatIcon,
  CodeIcon,
  DownloadIcon,
  HeartIcon,
  MailIcon,
  PinIcon,
  SparkleIcon,
} from "@/components/ui/Icons";

const githubHandle = site.github.replace(/^https?:\/\/github\.com\//, "@");
const linkedinHandle = site.linkedin.replace(
  /^https?:\/\/(www\.)?linkedin\.com\/in/,
  "",
);

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

  return (
    <section className="relative flex-1 overflow-hidden bg-paper">
      {/* Page header — the browser tabs are the navigation */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-5 md:px-10 md:pt-6">
        <p className="flex items-center gap-2 font-hand text-2xl text-cherry md:text-[1.7rem]">
          <CatIcon className="size-9 md:size-10" />
          anu.exe
        </p>
        <p className="hidden items-center gap-1.5 font-marker text-base text-ink-soft md:flex">
          <PinIcon className="size-4 text-cherry" />
          {site.location}
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 px-5 pb-20 pt-4 md:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.78fr)_minmax(0,0.7fr)] lg:gap-2 lg:pb-7">
        {/* Left doodle column (desktop) */}
        <ul
          className="pointer-events-none absolute left-3 top-24 hidden -rotate-[18deg] font-hand text-lg leading-snug text-cherry min-[1360px]:block"
          aria-hidden
        >
          <li className="mb-1 pl-6 text-xl">\ \ /</li>
          {homeHero.doodles.map((d, i) => (
            <li key={d} style={{ paddingLeft: `${i * 6}px` }}>
              {i > 0 && <span className="mr-1">›</span>}
              {d}
            </li>
          ))}
          <li className="pl-10">
            <HeartIcon className="size-5" />
          </li>
        </ul>

        {/* Text column */}
        <div className="relative z-10 flex flex-col pt-6 lg:pb-20 lg:pt-10 min-[1360px]:pl-28">
          <div className="flex items-end gap-3 font-hand text-cherry">
            <span className="-rotate-6 text-[1.9rem] leading-none md:text-[2.4rem]">
              {homeHero.greeting}
            </span>
            <HeartIcon className="mb-1 size-6 -rotate-12 md:size-7" />
            <span className="mb-4 ml-auto mr-4 rotate-6 text-2xl tracking-wide md:text-[2rem] lg:ml-16 lg:mr-0">
              \ {homeHero.stamp} /
            </span>
          </div>

          <h1 className="relative mt-1">
            <span className="sr-only">
              Portfolio — {site.name}
            </span>
            <BubbleWord word="PORTFOLIO" />
          </h1>

          <p className="mt-1 flex items-center gap-2 font-hand text-[2.3rem] leading-none text-cherry-dark md:text-[2.9rem]">
            {homeHero.displayName}
            <HeartIcon className="size-7 rotate-6 text-cherry" />
          </p>

          <p className="mt-4 text-xl font-semibold leading-snug text-ink md:text-[1.45rem]">
            {homeHero.title[0]}
            <br />
            {homeHero.title[1]}
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base">
            {homeHero.intro}
            <HeartIcon className="ml-1 inline size-4 -translate-y-0.5 text-cherry" />
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("projects")}
              className="inline-flex items-center gap-3 rounded-lg bg-cherry px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(196,22,28,0.7)] transition-colors hover:bg-cherry-dark"
            >
              View My Work
              <ArrowRightIcon className="size-5" />
            </button>
            {site.cvPath && (
              <a
                href={site.cvPath}
                download
                className="inline-flex items-center gap-3 rounded-lg border-[1.5px] border-cherry bg-paper px-6 py-3 text-[15px] font-semibold text-cherry transition-colors hover:bg-cherry-muted/50"
              >
                Download CV
                <DownloadIcon className="size-5" />
              </a>
            )}
          </div>

          <div className="mt-5 flex gap-2.5">
            <SocialSquare href={site.github} label="GitHub" external>
              <CodeIcon className="size-5" />
            </SocialSquare>
            <SocialSquare href={site.linkedin} label="LinkedIn" external>
              <BriefcaseIcon className="size-5" />
            </SocialSquare>
            <SocialSquare href={`mailto:${site.email}`} label="Email">
              <MailIcon className="size-5" />
            </SocialSquare>
          </div>

        </div>

        {/* Character */}
        <div className="relative z-10 mx-auto mt-8 w-[min(68vw,280px)] lg:-ml-[9%] lg:mt-0 lg:w-[118%] lg:max-w-[430px] lg:self-end">
          <img
            src="/art/anu-character.png"
            alt="Illustration of Anu in a white tee and black shorts with her kitten"
            width={387}
            height={584}
            className="relative z-10 h-auto w-full select-none"
            draggable={false}
          />
          <Sparkles />
        </div>

        {/* Right column: motto + contact note */}
        <div className="relative z-10 mt-8 flex flex-col items-center lg:mt-12 lg:items-stretch lg:pb-20">
          <p className="hidden -rotate-12 self-start font-hand text-[1.6rem] leading-tight text-cherry lg:block">
            {homeHero.motto[0]}
            <br />
            {homeHero.motto[1]}
            <HeartIcon className="ml-6 mt-1 block size-7" />
          </p>
          <ContactNote />
          <p
            className="mt-3 hidden rotate-[-14deg] self-end pr-2 text-right font-hand text-xl leading-[1.05] text-cherry lg:block"
            aria-hidden
          >
            {homeHero.noteDoodle.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
            <HeartIcon className="ml-auto mt-1 size-5" />
          </p>
        </div>
      </div>

      {/* Red wave into the cards section */}
      <svg
        className="absolute inset-x-0 bottom-0 z-0 h-16 w-full text-frame md:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 40C260 110 520 120 760 82s460-80 680-30V120H0Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

function BubbleWord({ word }: { word: string }) {
  const tilt = [-6, 4, -3, 5, -4, 3, -5, 4, -2];
  const lift = [4, -2, 3, -4, 2, -3, 4, -2, 3];
  return (
    <span
      aria-hidden
      className="block whitespace-nowrap font-bubble text-[clamp(3.9rem,15vw,5.6rem)] leading-[0.95] text-cherry drop-shadow-[0_3px_0_rgba(120,8,12,0.25)] lg:text-[clamp(5.2rem,8vw,9rem)]"
    >
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: `rotate(${tilt[i % tilt.length]}deg) translateY(${lift[i % lift.length]}px)`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Sparkles() {
  const items = [
    { c: "left-[2%] top-[14%] size-6", r: 0 },
    { c: "left-[16%] top-[22%] size-4", r: 15 },
    { c: "right-[14%] top-[8%] size-6", r: 0 },
    { c: "right-[2%] top-[38%] size-5", r: 10 },
    { c: "left-[6%] top-[62%] size-6", r: 0 },
    { c: "right-[18%] top-[58%] size-4", r: 0 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-cherry sm:block" aria-hidden>
      {items.map((s, i) => (
        <SparkleIcon
          key={i}
          className={`absolute ${s.c}`}
          style={{ transform: `rotate(${s.r}deg)` }}
        />
      ))}
      <HeartIcon className="absolute right-[10%] top-[70%] size-5" />
    </div>
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
      className="flex size-10 items-center justify-center rounded-lg border-[1.5px] border-cherry/80 bg-paper text-cherry transition-colors hover:bg-cherry hover:text-white"
    >
      {children}
    </a>
  );
}

function ContactNote() {
  const rows: { icon: ReactNode; text: string; href?: string; external?: boolean }[] = [
    { icon: <CodeIcon className="size-5" />, text: githubHandle, href: site.github, external: true },
    { icon: <BriefcaseIcon className="size-5" />, text: linkedinHandle, href: site.linkedin, external: true },
    ...(site.instagram
      ? [{ icon: <CatIcon className="size-5" />, text: "Instagram", href: site.instagram, external: true }]
      : []),
    { icon: <MailIcon className="size-5" />, text: site.email, href: `mailto:${site.email}` },
    { icon: <PinIcon className="size-5" />, text: site.location },
  ];

  return (
    <div className="relative mt-4 w-full max-w-[340px] rotate-[1.5deg] rounded-xl border border-line bg-paper p-5 pt-4 shadow-[6px_10px_0_-2px_rgba(168,17,23,0.10),0_18px_40px_-18px_rgba(80,10,14,0.35)]">
      {/* Paperclip */}
      <svg
        className="absolute -top-5 right-6 h-14 w-6 text-cherry"
        viewBox="0 0 24 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M17 18v24a5 5 0 0 1-10 0V10a3.5 3.5 0 0 1 7 0v30" />
      </svg>
      <WindowDots />
      <ul className="mt-4 space-y-3.5">
        {rows.map((row) => (
          <li key={row.text} className="flex items-center gap-3 font-marker text-[17px] text-ink">
            <span className="text-cherry">{row.icon}</span>
            {row.href ? (
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="min-w-0 truncate decoration-cherry/50 underline-offset-4 hover:text-cherry hover:underline"
              >
                {row.text}
              </a>
            ) : (
              <span className="truncate">{row.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WindowDots() {
  return (
    <div className="flex gap-1.5" aria-hidden>
      <span className="size-2.5 rounded-full bg-[#ec5f57]" />
      <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
      <span className="size-2.5 rounded-full bg-[#61c454]" />
    </div>
  );
}
