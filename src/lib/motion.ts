import type { Variants } from "framer-motion";

/** Subtle enter — content stays visible (no skeleton-style flash). */
export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-40px" as const,
};
