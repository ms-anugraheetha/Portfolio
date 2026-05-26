import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { techStack } from "@/data/techStack";
import { education } from "@/data/site";

export function buildHiringBrief(portfolioUrl?: string): string {
  const skillLines = techStack.map(
    (cat) => `${cat.name}: ${cat.items.join(", ")}`,
  );

  const lines = [
    `CANDIDATE BRIEF — ${site.name}`,
    "─".repeat(42),
    "",
    `Target roles: ${site.availability}`,
    `Location: ${site.location}`,
    `Headline: ${site.headline}`,
    "",
    "ABOUT",
    site.about,
    "",
    "EDUCATION",
    ...education.map(
      (e) => `• ${e.degree} | ${e.school} | ${e.period} | ${e.location}`,
    ),
    "",
    "SKILLS",
    ...skillLines,
    "",
    "CONTACT",
    `Email: ${site.email}`,
    `LinkedIn: ${site.linkedin}`,
    `GitHub: ${site.github}`,
    "",
    "PROJECTS",
    ...projects.map((p, i) => {
      const demoLine = p.demo ? `Demo: ${p.demo}` : "Status: in development";
      return [
        `${i + 1}. ${p.title} [${p.stack.join(", ")}]`,
        `   ${p.status === "in-development" ? "In progress" : "Deployed"}`,
        `   ${p.description}`,
        `   ${demoLine}`,
        `   Code: ${p.github}`,
      ].join("\n");
    }),
    "",
  ];

  if (portfolioUrl) lines.push(`Portfolio: ${portfolioUrl}`, "");
  lines.push("—", "Copied from portfolio · paste into ATS, Slack, or notes.");

  return lines.join("\n");
}

export function openAllLiveDemos(): void {
  const live = projects.filter((p) => p.demo);
  live.forEach((p, i) => {
    window.setTimeout(
      () => window.open(p.demo!, "_blank", "noopener,noreferrer"),
      i * 150,
    );
  });
}
