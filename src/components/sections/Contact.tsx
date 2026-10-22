import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/content/ContentContext";
import { BrandMark } from "@/components/ui/BrandMark";
import { DownloadIcon, MailIcon } from "@/components/ui/Icons";
import { fadeUp, staggerContainer } from "@/lib/motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry";

export function Contact() {
  const { contact, about, home } = useContent();

  const links: { label: string; href: string; icon: ReactNode; external?: boolean; download?: boolean }[] = [
    { label: "Email", href: contact.email ? `mailto:${contact.email}` : "", icon: <MailIcon className="size-5" /> },
    { label: "GitHub", href: contact.github, icon: <BrandMark id="github" className="size-5" />, external: true },
    { label: "LinkedIn", href: contact.linkedin, icon: <LinkedInIcon />, external: true },
    { label: "Instagram", href: contact.instagram, icon: <BrandMark id="instagram" className="size-5" />, external: true },
    { label: "CV", href: home.cvUrl, icon: <DownloadIcon className="size-5" />, download: true },
  ].filter((l) => l.href);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-8 px-5 pb-0 pt-8 md:px-10 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-6 lg:px-14">
        {/* Text */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:pb-16">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-ink-muted md:text-[13px]"
          >
            <span className="shrink-0">
              <span className="mr-2 text-cherry">//</span>Contact
            </span>
            <span className="relative hidden h-px max-w-[25rem] flex-1 bg-cherry/80 sm:block" aria-hidden>
              <span className="absolute -right-1 -top-[3px] size-[7px] rounded-full bg-cherry" />
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="relative mt-5 inline-flex items-center">
            <svg
              className="absolute -left-9 -top-1 hidden size-7 text-cherry md:block"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0z" />
            </svg>
            <h2 className="font-display text-[3.4rem] uppercase leading-[0.95] tracking-[-0.005em] text-[#160f10] sm:text-[4.4rem] md:text-[5.4rem]">
              Let&apos;s talk.
            </h2>
            <svg className="ml-3 h-11 w-9 shrink-0 text-cherry md:h-14 md:w-11" viewBox="0 0 28 36" fill="none" aria-hidden>
              <path d="M8 9 17 3M8 18h14M8 27l9 6" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 space-y-1.5 text-[16px] leading-relaxed text-ink-muted md:text-[18px]">
            <p>{about.status}</p>
            <p>
              {about.studying} · {contact.location}
            </p>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-3 md:gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(link.download ? { download: true } : {})}
                  className={`inline-flex h-14 items-center gap-3 rounded-[10px] border-[1.5px] border-cherry/80 bg-paper px-6 text-[16px] font-semibold text-ink transition-colors duration-200 hover:bg-cherry hover:text-white [&>svg]:text-cherry hover:[&>svg]:text-white md:px-7 ${focusRing}`}
                >
                  {link.icon}
                  {link.label}
                  {link.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Illustration */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative flex justify-center self-end lg:justify-end">
          <img
            src="/art/contact-phone-booth.webp"
            alt="Illustration of Anu sitting beside a red telephone box"
            width={625}
            height={711}
            draggable={false}
            className="h-auto w-[min(86vw,420px)] select-none lg:w-full lg:max-w-[560px]"
          />
        </motion.div>
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.8 7.6V18h2.8V9.6H5.8Zm1.4-4.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM10.4 9.6V18h2.8v-4.3c0-1.2.4-2.2 1.8-2.2 1.3 0 1.4 1.1 1.4 2.3V18h2.8v-4.9c0-2.5-.6-3.7-3.2-3.7-1.4 0-2.3.7-2.7 1.4h-.1V9.6h-2.8Z" />
    </svg>
  );
}
