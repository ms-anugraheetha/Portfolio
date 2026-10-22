import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { Skill } from "@/data/techStack";
import { useContent } from "@/content/ContentContext";
import { BrandMark } from "@/components/ui/BrandMark";
import { readableBrandColor, resolveSkillLogo, type ResolvedLogo } from "@/lib/techLogos";
import {
  ApiIcon,
  BrainIcon,
  CubeIcon,
  DatabaseIcon,
  DevicesIcon,
  KeyIcon,
  LayersIcon,
  NetworkIcon,
  SparkDiamondIcon,
} from "@/components/ui/Icons";
import { fadeUp, staggerContainer } from "@/lib/motion";

const pad = (n: number) => String(n).padStart(2, "0");

export function TechStack() {
  const { skills } = useContent();
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-14 pt-8 md:px-10 md:pt-10">
      <motion.header variants={fadeUp} initial="hidden" animate="visible" className="mb-7 md:mb-8">
        {/* Eyebrow — same rule as the other pages, ending in a ring */}
        <div className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-ink-muted md:text-[13px]">
          <span className="shrink-0">
            <span className="mr-2 text-cherry">//</span>Skills
          </span>
          <span className="relative hidden h-px max-w-[27rem] flex-1 bg-cherry/80 sm:block" aria-hidden>
            <span className="absolute -right-1.5 -top-[5px] size-[11px] rounded-full border-2 border-cherry bg-paper" />
          </span>
        </div>

        <div className="mt-4 inline-flex items-center">
          <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] tracking-[-0.005em] text-[#160f10] sm:text-[3.8rem] md:text-[4.6rem]">
            My toolkit.
          </h2>
          <svg className="ml-3 h-10 w-8 shrink-0 text-cherry md:h-12 md:w-10" viewBox="0 0 28 36" fill="none" aria-hidden>
            <path d="M8 9 17 3M8 18h14M8 27l9 6" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </div>
      </motion.header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 lg:grid-cols-2 lg:gap-5"
      >
        {skills.categories.map((cat, i) => (
          <motion.section
            key={`${cat.name}-${i}`}
            variants={fadeUp}
            aria-labelledby={`stack-${slug(cat.name)}-${i}`}
            className="rounded-2xl border border-line bg-paper-deep/30 p-5 transition-[border-color,box-shadow] duration-300 hover:border-cherry-light/40 hover:shadow-[0_18px_36px_-28px_rgba(80,10,14,0.45)] md:p-7 lg:last:odd:col-span-2"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3
                id={`stack-${slug(cat.name)}-${i}`}
                className="text-[13px] font-extrabold uppercase tracking-[0.24em] text-cherry md:text-[14px]"
              >
                {cat.name}
              </h3>
              <span className="text-xs tabular-nums text-ink-soft" aria-hidden>
                {pad(i + 1)}
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {cat.items.map((item, k) => (
                <SkillChip key={`${item.name}-${k}`} skill={item} />
              ))}
            </ul>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const logo = resolveSkillLogo(skill);
  const brand = logo && "brand" in logo ? logo.brand : null;
  const style = brand ? ({ "--brand": readableBrandColor(brand) } as CSSProperties) : undefined;

  return (
    <li
      style={style}
      className="flex h-11 items-center gap-2.5 rounded-full border border-line bg-white/70 pl-3.5 pr-4 text-[15px] text-ink transition-[border-color,box-shadow] duration-200 hover:border-cherry-light/50 hover:shadow-[0_4px_12px_-8px_rgba(120,8,12,0.45)]"
    >
      {logo && (
        <span className={`flex size-5 shrink-0 items-center justify-center ${brand ? "text-[var(--brand)]" : "text-ink"}`}>
          <SkillMark logo={logo} />
        </span>
      )}
      {skill.name}
    </li>
  );
}

function SkillMark({ logo }: { logo: NonNullable<ResolvedLogo> }) {
  if ("brand" in logo) {
    return <BrandMark id={logo.brand} className="size-full" />;
  }
  const Glyph = {
    database: DatabaseIcon,
    responsive: DevicesIcon,
    state: LayersIcon,
    api: ApiIcon,
    key: KeyIcon,
    ml: SparkDiamondIcon,
    network: NetworkIcon,
    brain: BrainIcon,
    cube: CubeIcon,
  }[logo.glyph];
  return <Glyph className="size-full" />;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
