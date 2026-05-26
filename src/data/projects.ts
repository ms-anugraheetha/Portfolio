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
    title: "UniMoney — Student Expense Tracker",
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
      "Developing an AI-assisted learning platform that helps beginner Python learners understand concepts through guided explanations, code analysis, and adaptive follow-up exercises.",
    stack: ["React", "TypeScript", "FastAPI", "Python"],
    github: "https://github.com/ms-anugraheetha",
    status: "in-development",
    behindTheBuild: [
      "Designing agent-based workflows for code explanation, debugging assistance, and learning reinforcement.",
      "Integrating Python execution and static analysis tools to evaluate user-submitted code snippets.",
      "Building TypeScript-based frontend interfaces focused on interactive learning and user feedback.",
    ],
  },
];

export const defaultProjectId: ProjectId = "travel";
