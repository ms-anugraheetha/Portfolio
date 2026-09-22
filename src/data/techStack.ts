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
