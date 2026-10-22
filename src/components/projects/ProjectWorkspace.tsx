import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useContent } from "@/content/ContentContext";
import { BrandMark } from "@/components/ui/BrandMark";
import { ExternalIcon } from "@/components/ui/Icons";
import { logoForTech, readableBrandColor } from "@/lib/techLogos";
import { fadeUp, staggerContainer } from "@/lib/motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

/** How many tech badges a card shows before collapsing the rest into "+N". */
const MAX_BADGES = 5;

/** Soft panel tints behind the illustrations, alternating card to card. */
const ART_TINTS = ["bg-[#fdf3f1]", "bg-[#faf3ea]"];

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectWorkspace() {
  const { projects } = useContent();
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-14 pt-8 md:px-10 md:pt-10">
      <motion.header variants={fadeUp} initial="hidden" animate="visible" className="pb-7 md:pb-8">
        {/* Eyebrow — mirrors the homepage's "// HELLO, I'M" rule */}
        <div className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ink-muted md:text-[13px]">
          <span className="shrink-0">
            <span className="mr-2 text-cherry">//</span>Projects
          </span>
          <span className="relative hidden h-px max-w-[25rem] flex-1 bg-cherry/80 sm:block" aria-hidden>
            <span className="absolute -right-1 -top-[3px] size-[7px] rounded-full bg-cherry" />
          </span>
          <span className="hidden flex-1 lg:block" aria-hidden />
          <span className="hidden items-center gap-4 lg:flex" aria-hidden>
            <span className="h-px w-36 bg-ink/40" />
            <span className="font-bold tracking-[0.2em] text-cherry">////</span>
          </span>
        </div>

        <div className="relative mt-4 inline-flex items-center">
          <svg
            className="absolute -left-9 -top-1 hidden size-7 text-cherry md:block"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0z" />
          </svg>
          <h2 className="font-display text-[2.45rem] uppercase leading-[0.95] tracking-[-0.005em] text-[#160f10] sm:text-[3.8rem] md:text-[4.6rem]">
            Things I&apos;ve Built
          </h2>
          <svg
            className="ml-3 h-10 w-8 shrink-0 text-cherry md:h-12 md:w-10"
            viewBox="0 0 28 36"
            fill="none"
            aria-hidden
          >
            <path d="M8 9 17 3M8 18h14M8 27l9 6" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </div>

        <p className="text-balance mt-3 max-w-[30rem] text-base leading-relaxed text-ink-muted md:text-[17px]">
          A collection of projects I&apos;ve worked on, ideas I&apos;ve explored,
          and things I&apos;ve brought to life.
        </p>
      </motion.header>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-5 lg:grid-cols-2 lg:gap-6"
        aria-label="Projects"
      >
        {projects.map((project, i) => (
          <motion.li key={project.id} variants={fadeUp} className="flex min-w-0">
            <ProjectCard project={project} number={i + 1} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function ProjectCard({ project, number }: { project: Project; number: number }) {
  const headingId = `project-${project.id}-title`;
  const shown = project.stack.slice(0, MAX_BADGES);
  const hidden = project.stack.slice(MAX_BADGES);

  return (
    <article
      aria-labelledby={headingId}
      className="group flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgba(43,29,30,0.03)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cherry-light/45 hover:shadow-[0_22px_44px_-28px_rgba(80,10,14,0.5)] focus-within:border-cherry-light/45 motion-safe:hover:-translate-y-1"
    >
      {/* Slim window bar — echoes the browser chrome */}
      <div className="flex h-9 min-w-0 shrink-0 items-center gap-3 border-b border-line bg-chrome/45 px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ec5f57]" />
          <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="size-2.5 rounded-full bg-[#61c454]" />
        </span>
        <span className="min-w-0 truncate text-xs text-ink-soft">
          anugraheetha.dev/projects/
          <span className="text-ink-muted">{project.slug}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:flex lg:flex-col">
        {/* Illustration */}
        <div
          className={`relative flex h-60 shrink-0 items-center justify-center overflow-hidden border-b border-line px-4 py-3 sm:order-last sm:h-auto sm:min-h-72 sm:border-b-0 sm:border-l lg:order-none lg:h-72 lg:min-h-0 lg:border-b lg:border-l-0 ${ART_TINTS[(number - 1) % ART_TINTS.length]}`}
        >
          {project.image && (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full max-h-[17rem] w-auto max-w-full select-none object-contain mix-blend-multiply transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 md:p-7">
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-2xl font-extrabold leading-none tabular-nums text-cherry">
              {pad(number)}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              {project.category}
            </span>
          </div>

          <h3
            id={headingId}
            className="mt-3 font-heading text-[1.45rem] font-bold leading-tight tracking-tight text-ink"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
            {shown.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {hidden.length > 0 && (
              <li
                title={hidden.join(", ")}
                className="flex h-7 items-center rounded-full border border-line bg-paper px-2.5 text-xs font-semibold text-ink-soft"
              >
                +{hidden.length}
                <span className="sr-only">: {hidden.join(", ")}</span>
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[10px] bg-cherry px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(196,22,28,0.85)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-cherry-dark active:translate-y-px motion-safe:hover:-translate-y-px ${focusRing}`}
              >
                Live demo
                <ExternalIcon className="size-4" />
                <span className="sr-only">for {project.title} (opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[10px] border-[1.5px] border-line bg-paper px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-cherry hover:text-cherry active:translate-y-px ${focusRing}`}
              >
                <BrandMark id="github" className="size-4" />
                GitHub
                <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function TechBadge({ name }: { name: string }) {
  const id = logoForTech(name);
  return (
    <li
      style={id ? ({ "--brand": readableBrandColor(id) } as CSSProperties) : undefined}
      className="flex h-7 items-center gap-1.5 rounded-full border border-line bg-paper-deep/50 px-2.5 text-xs font-medium text-ink-muted"
    >
      {id && <BrandMark id={id} className="size-3.5 shrink-0 text-[var(--brand)]" />}
      {name}
    </li>
  );
}
