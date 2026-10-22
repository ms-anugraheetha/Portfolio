import type { Project, SiteContent } from "@/content/types";

export function buildHiringBrief(content: SiteContent, portfolioUrl?: string): string {
  const { home, about, contact, skills, projects } = content;
  const skillLines = skills.categories.map(
    (cat) => `${cat.name}: ${cat.items.map((s) => s.name).join(", ")}`,
  );

  const lines = [
    `CANDIDATE BRIEF — ${contact.fullName}`,
    "─".repeat(42),
    "",
    `Target roles: ${about.status}`,
    `Location: ${contact.location}`,
    `Headline: ${home.title}`,
    "",
    "ABOUT",
    about.paragraphs.join("\n\n"),
    "",
    "EDUCATION",
    ...about.education.map(
      (e) => `• ${e.degree} | ${e.school} | ${e.period} | ${e.location}`,
    ),
    "",
    "SKILLS",
    ...skillLines,
    "",
    "CONTACT",
    `Email: ${contact.email}`,
    `LinkedIn: ${contact.linkedin}`,
    `GitHub: ${contact.github}`,
    "",
    "PROJECTS",
    ...projects.map((p, i) => {
      const demoLine = p.demo ? `Demo: ${p.demo}` : "Status: in development";
      return [
        `${i + 1}. ${p.title} [${p.stack.join(", ")}]`,
        `   ${p.status === "in-development" ? "In progress" : "Deployed"}`,
        `   ${p.description || p.summary}`,
        `   ${demoLine}`,
        ...(p.github ? [`   Code: ${p.github}`] : []),
      ].join("\n");
    }),
    "",
  ];

  if (portfolioUrl) lines.push(`Portfolio: ${portfolioUrl}`, "");
  lines.push("—", "Copied from portfolio · paste into ATS, Slack, or notes.");

  return lines.join("\n");
}

export function openAllLiveDemos(projects: Project[]): void {
  const live = projects.filter((p) => p.demo);
  live.forEach((p, i) => {
    window.setTimeout(
      () => window.open(p.demo!, "_blank", "noopener,noreferrer"),
      i * 150,
    );
  });
}
