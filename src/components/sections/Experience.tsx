import { motion } from "framer-motion";
import { achievements, education } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Provisional layout — to be finalised once the Experience page reference
 * is provided. Content mirrors the Achievements card on the Home tab.
 */
export function Experience() {
  return (
    <div className="px-5 py-10 md:px-10 md:py-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Achievements</SectionLabel>
          <h2 className="mt-2 font-marker text-4xl text-cherry-dark">
            Programmes &amp; milestones
          </h2>
          <ol className="relative ml-2 mt-6 space-y-5 border-l-2 border-cherry/70 pl-6">
            {achievements.map((a) => (
              <li key={a.title} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 size-3.5 rounded-full bg-cherry ring-4 ring-paper"
                  aria-hidden
                />
                <p className="font-semibold text-ink">
                  {a.title}
                  {a.status && (
                    <span className="ml-2 rounded-full bg-cherry-muted px-2 py-0.5 text-xs font-semibold text-cherry-dark">
                      {a.status}
                    </span>
                  )}
                </p>
                {(a.detail || a.period) && (
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {[a.detail, a.period].filter(Boolean).join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionLabel>Education</SectionLabel>
          <h2 className="mt-2 font-marker text-4xl text-cherry-dark">
            Where I&apos;ve studied
          </h2>
          <ul className="mt-6 space-y-4">
            {education.map((item) => (
              <li
                key={item.degree}
                className="rounded-xl border border-line bg-paper-deep/50 p-5"
              >
                <p className="font-semibold text-ink">{item.degree}</p>
                <p className="mt-1 text-sm text-ink-muted">{item.school}</p>
                <p className="mt-1 text-xs text-ink-soft">
                  {item.period} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
