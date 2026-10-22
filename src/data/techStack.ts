import type { BrandLogoId } from "./skillLogos";

/**
 * A skill's mark: a real brand logo (see skillLogos.ts), or one of the
 * generic line icons for concepts that have no logo (SQL, REST, OAuth…).
 */
export type SkillLogo =
  | { brand: BrandLogoId }
  | { glyph: "database" | "responsive" | "state" | "api" | "key" | "ml" | "network" | "brain" | "cube" };

export type Skill = {
  name: string;
  /** Optional — when omitted, a logo is matched from the name. */
  logo?: SkillLogo;
};

export type TechCategory = {
  name: string;
  items: Skill[];
};

/** Aligned with CV skills section */
export const techStack: TechCategory[] = [
  {
    name: "AI & Machine Learning",
    items: [
      { name: "Python", logo: { brand: "python" } },
      { name: "Machine Learning", logo: { glyph: "ml" } },
      { name: "Scikit-learn", logo: { brand: "scikitlearn" } },
      { name: "LLMs", logo: { glyph: "network" } },
      { name: "RAG", logo: { glyph: "brain" } },
      { name: "AI Agents", logo: { glyph: "state" } },
      { name: "MCP", logo: { glyph: "cube" } },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "Python", logo: { brand: "python" } },
      { name: "TypeScript", logo: { brand: "typescript" } },
      { name: "JavaScript", logo: { brand: "javascript" } },
      { name: "SQL", logo: { glyph: "database" } },
      { name: "C", logo: { brand: "c" } },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React.js", logo: { brand: "react" } },
      { name: "HTML5", logo: { brand: "html5" } },
      { name: "CSS3", logo: { brand: "css" } },
      { name: "Responsive Design", logo: { glyph: "responsive" } },
      { name: "State Management", logo: { glyph: "state" } },
      { name: "Tailwind CSS", logo: { brand: "tailwindcss" } },
      { name: "Vite", logo: { brand: "vite" } },
    ],
  },
  {
    name: "Backend & APIs",
    items: [
      { name: "FastAPI", logo: { brand: "fastapi" } },
      { name: "Node.js", logo: { brand: "nodejs" } },
      { name: "Express.js", logo: { brand: "express" } },
      { name: "Laravel", logo: { brand: "laravel" } },
      { name: "REST APIs", logo: { glyph: "api" } },
      { name: "OAuth", logo: { glyph: "key" } },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "PostgreSQL", logo: { brand: "postgresql" } },
      { name: "SQLite", logo: { brand: "sqlite" } },
      { name: "MongoDB", logo: { brand: "mongodb" } },
      { name: "MySQL", logo: { brand: "mysql" } },
    ],
  },
  {
    name: "DevOps & Cloud",
    items: [
      { name: "Docker", logo: { brand: "docker" } },
      { name: "Nginx", logo: { brand: "nginx" } },
      { name: "Git", logo: { brand: "git" } },
      { name: "GitHub Actions (CI/CD)", logo: { brand: "githubactions" } },
      { name: "Cloudflare (R2, DNS)", logo: { brand: "cloudflare" } },
      { name: "Railway", logo: { brand: "railway" } },
      { name: "Vercel", logo: { brand: "vercel" } },
      { name: "Netlify", logo: { brand: "netlify" } },
      { name: "Render", logo: { brand: "render" } },
    ],
  },
];
