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
    items: ["FastAPI", "Node.js", "Express.js", "REST APIs"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "SQLite", "MongoDB", "MySQL"],
  },
  {
    name: "Tools & Platforms",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Render"],
  },
];
