export type TechCategory = {
  name: string;
  items: string[];
};

/** Aligned with CV skills section */
export const techStack: TechCategory[] = [
  {
    name: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C"],
  },
  {
    name: "Frontend",
    items: [
      "React.js",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "State Management",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    name: "Backend",
    items: ["FastAPI", "Node.js", "Express.js", "Laravel", "REST APIs", "OAuth"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "SQLite", "MongoDB", "MySQL"],
  },
  {
    name: "DevOps & Cloud",
    items: [
      "Docker",
      "Nginx",
      "Git",
      "GitHub Actions (CI/CD)",
      "Cloudflare (R2, DNS)",
      "Railway",
      "Vercel",
      "Netlify",
      "Render",
    ],
  },
];

/** Compact skill groups for the Home tab card (subset of the CV list). */
export const homeSkills: { name: string; items: { label: string; mark: string }[] }[] = [
  {
    name: "Languages",
    items: [
      { label: "Python", mark: "Py" },
      { label: "JavaScript", mark: "JS" },
      { label: "TypeScript", mark: "TS" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { label: "React", mark: "Re" },
      { label: "Vite", mark: "Vi" },
      { label: "Tailwind CSS", mark: "Tw" },
    ],
  },
  {
    name: "Backend & Tools",
    items: [
      { label: "FastAPI", mark: "Fa" },
      { label: "Node.js", mark: "No" },
      { label: "PostgreSQL", mark: "Pg" },
      { label: "SQLite", mark: "Sq" },
      { label: "Git", mark: "Gt" },
      { label: "Docker", mark: "Dk" },
    ],
  },
];
