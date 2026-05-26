import { motion } from "framer-motion";
import { site, education } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

const principles = [
  {
    title: "User-centered problems",
    body: "I start with what someone is trying to accomplish—not the feature list.",
  },
  {
    title: "Frontend with full-stack context",
    body: "Interfaces backed by APIs and data models I understand end to end.",
  },
  {
    title: "Ship and iterate",
    body: "Deployed apps, real feedback, and steady improvement matter more than perfect plans.",
  },
];

export function About() {
  return (
    <div className="px-5 py-10 md:px-10 md:py-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div variants={fadeUp} className="max-w-2xl">
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-charcoal">
            Building web products with a frontend-first lens.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-muted">
            {site.about}
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-muted">
            {site.workStyle}
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionLabel>Education</SectionLabel>
          <ul className="mt-4 space-y-4">
            {education.map((item) => (
              <li
                key={item.degree}
                className="rounded-xl border border-line bg-ivory-deep/40 p-5"
              >
                <p className="font-heading font-semibold text-charcoal">
                  {item.degree}
                </p>
                <p className="mt-1 text-sm text-charcoal-muted">
                  {item.school}
                </p>
                <p className="mt-1 text-xs text-charcoal-soft">
                  {item.period} · {item.location}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <div>
          <SectionLabel>How I work</SectionLabel>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {principles.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="rounded-xl border border-line bg-ivory-deep/40 p-5"
              >
                <h3 className="font-heading text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
