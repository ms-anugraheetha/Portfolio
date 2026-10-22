import { brandLogos, type BrandLogoId } from "@/data/skillLogos";

/** Tech names as written in project data → their logo. */
const logoByName: Record<string, BrandLogoId> = {
  php: "php",
  laravel: "laravel",
  postgresql: "postgresql",
  docker: "docker",
  nginx: "nginx",
  razorpay: "razorpay",
  railway: "railway",
  react: "react",
  "react.js": "react",
  fastapi: "fastapi",
  python: "python",
  sqlite: "sqlite",
  "node.js": "nodejs",
  "express.js": "express",
  express: "express",
  typescript: "typescript",
  javascript: "javascript",
  mongodb: "mongodb",
  mysql: "mysql",
  vercel: "vercel",
  render: "render",
  netlify: "netlify",
  "tailwind css": "tailwindcss",
  "scikit-learn": "scikitlearn",
  vite: "vite",
  git: "git",
  cloudflare: "cloudflare",
};

export function logoForTech(name: string): BrandLogoId | undefined {
  return logoByName[name.trim().toLowerCase()];
}

/**
 * Brand colour that stays visible on cream: very light marks
 * (JavaScript yellow, React cyan…) are deepened toward ink.
 */
export function readableBrandColor(id: BrandLogoId) {
  const hex = brandLogos[id].hex;
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.35
    ? `color-mix(in oklab, ${hex} 62%, var(--color-ink))`
    : hex;
}

export const SKILL_GLYPHS = ["database", "responsive", "state", "api", "key", "ml", "network", "brain", "cube"] as const;
export type SkillGlyph = (typeof SKILL_GLYPHS)[number];
export type ResolvedLogo = { brand: BrandLogoId } | { glyph: SkillGlyph } | null;

/**
 * A skill's mark, tolerant of CMS data: an explicit brand/glyph is used when
 * it is one we can draw; otherwise the name is matched to a known logo; if
 * nothing matches, no icon is shown.
 */
export function resolveSkillLogo(skill: { name: string; logo?: unknown }): ResolvedLogo {
  const logo = skill.logo as { brand?: string; glyph?: string } | undefined;
  if (logo?.brand && logo.brand in brandLogos) return { brand: logo.brand as BrandLogoId };
  if (logo?.glyph && (SKILL_GLYPHS as readonly string[]).includes(logo.glyph)) {
    return { glyph: logo.glyph as SkillGlyph };
  }
  const byName = logoForTech(skill.name);
  return byName ? { brand: byName } : null;
}
