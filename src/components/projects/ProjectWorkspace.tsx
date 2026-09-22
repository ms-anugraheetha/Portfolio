import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { projects } from "@/data/projects";
import { fadeUp } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { ProjectId } from "@/types/workspace";

export function ProjectWorkspace() {
  const { activeProjectId, selectProject } = useWorkspace();
  const [buildOpen, setBuildOpen] = useState(false);
  const project = projects.find((p) => p.id === activeProjectId)!;

  const onSelectProject = (id: ProjectId) => {
    setBuildOpen(false);
    selectProject(id);
  };

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-8 max-w-xl"
      >
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
          Product workspaces
        </h2>
        <p className="mt-3 text-base text-charcoal-muted">
          Switch tabs to explore each build-stack, links, and build notes.
        </p>
      </motion.header>

      <div
        className="relative mb-6 -mx-5 border-b border-line px-5 md:mx-0 md:px-0"
        role="presentation"
      >
        <div
          className="flex gap-1 overflow-x-auto pb-0"
          role="tablist"
          aria-label="Projects"
        >
          {projects.map((p) => {
            const active = p.id === activeProjectId;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectProject(p.id)}
                className={`relative shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ivory-deep text-charcoal"
                    : "text-charcoal-muted hover:bg-ivory-deep/50 hover:text-charcoal"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-x-0 top-0 h-0.5 bg-sage"
                    transition={{ duration: 0.25 }}
                  />
                )}
                <span className="hidden sm:inline">
                  {p.title}
                  {p.status === "in-development" ? " · WIP" : ""}
                </span>
                <span className="sm:hidden">
                  {p.shortTitle}
                  {p.status === "in-development" ? " · WIP" : ""}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-ivory to-transparent sm:hidden"
          aria-hidden
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-line bg-ivory-deep/40 p-5 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-2xl font-semibold text-charcoal">
                  {project.title}
                </h3>
                {project.status === "in-development" && (
                  <span className="rounded-full border border-sand bg-sand/40 px-2.5 py-0.5 text-xs font-medium text-charcoal-muted">
                    In development
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-sage">
                {project.tagline}
              </p>
              <p className="mt-4 leading-relaxed text-charcoal-muted">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal-soft">
                Stack
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line bg-ivory px-3 py-1 text-xs font-medium text-charcoal-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {project.demo ? (
                  
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-charcoal underline-offset-4 hover:text-sage hover:underline"
                  >
                    Live demo
                  </a>
                ) : (
                  <span className="text-sm text-charcoal-soft">
                    Live demo coming soon
                  </span>
                )}
                
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-charcoal-muted underline-offset-4 hover:text-sage hover:underline"
                >
                  GitHub
                </a>
              </div>

              <button
                type="button"
                onClick={() => setBuildOpen((v) => !v)}
                aria-expanded={buildOpen}
                className="mt-6 flex items-center gap-2 text-sm font-medium text-charcoal-muted hover:text-sage"
              >
                {buildOpen ? "Hide" : "Behind the build"}
                <svg
                  className={`size-4 transition-transform ${buildOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {buildOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2 overflow-hidden border-l-2 border-sage-muted pl-4"
                  >
                    {project.behindTheBuild.map((note) => (
                      <li
                        key={note}
                        className="text-sm leading-relaxed text-charcoal-muted"
                      >
                        {note}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
