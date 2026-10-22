export const site = {
  name: "Anugraheetha Bin Saj",
  shortName: "Anu",
  role: "",
  headline: "Building products end-to-end",
  location: "Riga, Latvia",
  educationLine: "MSc Computer Science · Riga Nordic University",
  availability: "Open to work full-time",
  about:
    "Based in Riga, Latvia, with a BSc in Computer Systems from Riga Technical University and currently pursuing an MSc in Computer Science at Riga Nordic University. Experience building and deploying production applications using React, FastAPI, Node.js, Laravel, PostgreSQL, and Python. Focused on user-centered problem solving, with experience across e-commerce, recommendation systems, and AI-assisted software projects.",
  workStyle:
    "Comfortable working independently or on a team, I genuinely value healthy, direct feedback and use it to improve the work.",
  languages: "English",
  email: "anugraheetha.bs@gmail.com",
  github: "https://github.com/ms-anugraheetha",
  linkedin:
    "https://www.linkedin.com/in/anugraheetha-bin-saj-9276a933a",
  /** Put the CV at public/cv.pdf and set this to "/cv.pdf" to show "Download CV". */
  cvPath: undefined as string | undefined,
  /** Optional — add a full profile URL to show an Instagram link. */
  instagram: undefined as string | undefined,
} as const;

/** Home tab copy, taken from the Home page reference. */
export const homeHero = {
  greeting: "Hi, I'm",
  displayName: "Anugraheetha",
  stamp: "2025",
  title: ["Computer Science Graduate", "& Aspiring Software Developer"],
  intro:
    "I build web applications, explore AI and create solutions that make everyday life a little easier and more fun.",
  doodles: ["coffee", "code", "cats", "travel", "better me"],
  motto: ["same girl...", "bigger dreams"],
  noteDoodle: ["good", "ideas", "better", "code"],
} as const;

/** Experience & Achievements — order follows the Home reference. */
export const achievements: {
  title: string;
  detail?: string;
  period?: string;
  status?: string;
}[] = [
  {
    title: "BSc Computer Systems",
    detail: "Riga Technical University",
    period: "2023 – 2026",
  },
  { title: "Young Leaders Academy", detail: "KidCafeBot (Telegram Bot)" },
  { title: "Women's Health Hackathon" },
  { title: "Logopeds.online Business Challenge" },
  { title: "Accenture DevOps & Cloud Bootcamp", status: "Applied" },
];

export const education = [
  {
    degree: "MSc Computer Science",
    school: "Riga Nordic University",
    period: "Sep 2026 - Present",
    location: "Riga, Latvia",
  },
  {
    degree: "BSc Computer Systems",
    school: "Riga Technical University",
    period: "Sep 2023 - Sep 2026",
    location: "Riga, Latvia",
  },
  {
    degree: "Diploma in Computer Application",
    school: "Skilltech",
    period: "Mar 2023 - Aug 2023",
    location: "Vadakara, India",
  },
] as const;
