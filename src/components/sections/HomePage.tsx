import { motion } from "framer-motion";
import { site } from "@/data/site";
import { useWorkspace } from "@/context/WorkspaceContext";
import { BrandMark } from "@/components/workspace/BrandMark";
import type { ProjectId, SectionId } from "@/types/workspace";

const shortcuts: {
  label: string;
  sub: string;
  action: "section" | "project";
  section?: SectionId;
  projectId?: ProjectId;
}[] = [
  {
    label: "Travel System",
    sub: "React · FastAPI · ML",
    action: "project",
    projectId: "travel",
  },
  {
    label: "UniMoney",
    sub: "React · Node · PostgreSQL",
    action: "project",
    projectId: "unimoney",
  },
  {
    label: "Python Coach",
    sub: "In progress",
    action: "project",
    projectId: "coach",
  },
  { label: "About", sub: "Education & approach", action: "section", section: "about" },
  { label: "Stack", sub: "Skills from my CV", action: "section", section: "stack" },
  { label: "Contact", sub: "Get in touch", action: "section", section: "contact" },
];

export function HomePage() {
  const { navigate, selectProject } = useWorkspace();

  const openShortcut = (item: (typeof shortcuts)[number]) => {
    if (item.action === "project" && item.projectId) {
      selectProject(item.projectId);
    } else if (item.section) {
      navigate(item.section);
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-5 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex w-full max-w-lg flex-col items-center"
      >
        <div className="mb-8 text-center md:mb-10">
          <BrandMark size="lg" />
        </div>

        <div className="w-full rounded-full border border-line bg-ivory px-5 py-3.5 shadow-[0_4px_24px_-8px_rgba(44,44,42,0.12)] ring-1 ring-line/50">
          <p className="text-center font-heading text-sm font-medium text-charcoal md:text-base">
            {site.headline}
          </p>
          <p className="mt-1 text-center text-xs text-charcoal-soft md:text-sm">
            {site.educationLine} · {site.location}
          </p>
        </div>

        <p className="mt-8 max-w-md text-center text-sm leading-relaxed text-charcoal-muted">
          Final-year CS student · deployed full-stack apps · recommendation
          systems · AI-assisted learning tools. Open-minded, quick to learn.
        </p>

        <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {shortcuts.map((item, i) => (
            <motion.button
              key={item.label}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.3 }}
              onClick={() => openShortcut(item)}
              className="group flex flex-col items-start rounded-xl border border-line bg-ivory-deep/40 p-4 text-left transition-all hover:border-sage-muted hover:bg-ivory-deep hover:shadow-sm"
            >
              <span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-sage-muted/50 text-sm font-semibold text-sage transition-colors group-hover:bg-sage-muted">
                {item.label.charAt(0)}
              </span>
              <span className="font-heading text-sm font-medium text-charcoal">
                {item.label}
              </span>
              <span className="mt-0.5 text-xs text-charcoal-soft">{item.sub}</span>
            </motion.button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-charcoal-soft">
          {site.availability}
        </p>
      </motion.div>
    </div>
  );
}
