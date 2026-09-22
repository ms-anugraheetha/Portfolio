import type { ProjectId } from "@/types/workspace";

export type Project = {
  id: ProjectId;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  status?: "live" | "in-development";
  behindTheBuild: string[];
};

export const projects: Project[] = [
  {
    id: "rasova",
    title: "Rasova",
    tagline: "Production e-commerce platform with payments",
    description:
      "Full-stack Laravel e-commerce platform with a mobile-first storefront, admin panel, and guest checkout, deployed to production on a custom Docker/Nginx stack.",
    stack: ["PHP", "Laravel", "PostgreSQL", "Docker", "Nginx", "Razorpay", "Railway"],
    github: "https://github.com/ms-anugraheetha",
    demo: "https://rasovadelights.com",
    status: "live",
    behindTheBuild: [
      "Built a full-stack Laravel e-commerce platform with mobile-first storefront, admin panel, and guest checkout.",
      "Integrated Razorpay payments with signature-verified webhooks and Cloudflare R2 image storage.",
      "Deployed to production on a custom Docker/Nginx stack on Railway with a custom domain; automated daily database backups via GitHub Actions.",
    ],
  },
  {
    id: "travel",
    title: "Travel Destination Recommendation System",
    tagline: "ML-powered personalized travel suggestions",
    description:
      "Full-stack recommendation platform that generates personalized travel suggestions using Ridge Regression and Collaborative Filtering models.",
    stack: ["React", "FastAPI", "Python", "SQLite"],
    github:
      "https://github.com/ms-anugraheetha/travel_destination_recommendation_system",
    demo: "https://travel-destination-recommendation-s-ten.vercel.app/",
    status: "live",
    behindTheBuild: [
      "Developed RESTful FastAPI backend with ML-based recommendation workflows for personalized destination matching.",
      "Designed responsive React frontend with onboarding flows, preference collection, and dynamic recommendation interfaces.",
      "Deployed frontend on Vercel and backend on Render with database-backed user preference storage.",
    ],
  },
  {
    id: "unimoney",
    title: "UniMoney - Student Expense Tracker",
    tagline: "Budgeting and spending analytics for students",
    description:
      "Full-stack expense tracking application for university students with budgeting, transaction management, and spending analytics.",
    stack: ["React", "Node.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/ms-anugraheetha/UniMoney",
    demo: "https://uni-money-two.vercel.app/",
    status: "live",
    behindTheBuild: [
      "Built REST APIs and PostgreSQL database structure for expense tracking and budget management.",
      "Implemented responsive dashboard interfaces and state-driven UI components using React.",
      "Deployed on Vercel with project versioning through Git and GitHub.",
    ],
  },
  {
    id: "coach",
    title: "Python Confidence Coach",
    tagline: "AI-assisted learning for beginner Python",
    description:
      "AI-assisted learning platform using an agentic explain-check-assess coaching loop to help beginner Python learners understand concepts through guided explanations, code analysis, and adaptive follow-up exercises.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    github: "https://github.com/ms-anugraheetha/python-confidence-coach",
    demo: "https://python-confidence-coach.vercel.app/login",
    status: "live",
    behindTheBuild: [
      "Built an AI-assisted learning platform using an agentic explain-check-assess coaching loop for Python beginners.",
      "Built a standalone MCP server for explanation, comprehension-check, and answer-assessment tools.",
      "Developed FastAPI + PostgreSQL backend with JWT/Google OAuth; Dockerized and deployed on Render + Vercel.",
    ],
  },
];

export const defaultProjectId: ProjectId = "rasova";
