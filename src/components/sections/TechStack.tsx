import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TechStack() {
  return (
    <div className="px-5 py-10 md:px-10 md:py-14">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionLabel>Stack</SectionLabel>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-charcoal">
          Skills at a glance.
        </h2>
      </motion.header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2"
      >
        {techStack.map((cat) => (
          <motion.div
            key={cat.name}
            variants={fadeUp}
            className="rounded-xl border border-line bg-ivory-deep/40 p-6"
          >
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-sage">
              {cat.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-ivory px-3 py-1 text-sm text-charcoal-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
