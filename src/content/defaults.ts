/**
 * The portfolio's built-in content, assembled from the existing data files.
 *
 * The public site renders this immediately, and keeps rendering it when no
 * CMS is configured or the CMS hasn't been initialised yet. The admin
 * dashboard's "Import current content" action copies exactly this into the
 * database, so nothing changes visually when you switch over.
 */
import { site, homeHero, education, achievements } from "@/data/site";
import { projects } from "@/data/projects";
import { techStack } from "@/data/techStack";
import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  home: {
    greeting: "Hello, I'm",
    headingLine1: "Anugraheetha",
    headingLine2: "Bin Saj",
    title: `${homeHero.title[0]} ${homeHero.title[1]}`,
    intro: homeHero.intro,
    ctaLabel: "View My Work",
    cvUrl: site.cvPath ?? "",
  },
  about: {
    heading: "A little about me",
    paragraphs: [
      "Based in Riga, Latvia, I’m a Computer Systems graduate from Riga Technical University and currently pursuing an MSc in Computer Science at Riga Nordic University.",
      "I enjoy building web applications, exploring AI and turning ideas into real, useful products. I’ve worked with React, FastAPI, Node.js, Laravel, PostgreSQL and Python, and I love solving problems through clean, user-friendly design and thoughtful functionality.",
      "I’m always curious, love learning new things, and enjoy working both independently and in a team. I value clear communication, feedback and creating work that actually helps people.",
    ],
    studying: site.educationLine,
    status: site.availability,
    education: education.map((e) => ({ ...e })),
    principles: [
      {
        title: "User-centered problems",
        body: "I start with what someone is trying to accomplish—not the feature list.",
      },
      {
        title: "Frontend with full-stack context",
        body: "Interfaces backed by APIs and data models I understand end to end.",
      },
      {
        title: "Ship and iterate",
        body: "Deployed apps, real feedback, and steady improvement matter more than perfect plans.",
      },
    ],
  },
  contact: {
    fullName: site.name,
    shortName: site.shortName,
    email: site.email,
    location: site.location,
    github: site.github,
    linkedin: site.linkedin,
    instagram: site.instagram ?? "",
  },
  skills: { categories: techStack },
  experience: { achievements: achievements.map((a) => ({ ...a })) },
  projects,
};
