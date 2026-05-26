import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/motion";

const links = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.github, external: true },
  { label: "LinkedIn", href: site.linkedin, external: true },
] as const;

export function Contact() {
  return (
    <div className="flex min-h-full items-center px-5 py-10 md:px-10 md:py-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-xl"
      >
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-3 text-base text-charcoal-muted">
          {site.availability}
        </p>
        <p className="mt-1 text-sm text-charcoal-soft">
          {site.educationLine} · {site.location}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-2 inline-block text-sm text-charcoal-soft hover:text-sage"
        >
          {site.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-full border border-line bg-ivory-deep/50 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:border-sage hover:bg-sage-muted/30"
            >
              {link.label}
            </a>
          ))}
          {site.cvPath && (
            <a
              href={site.cvPath}
              download
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-charcoal hover:border-sage"
            >
              CV
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
