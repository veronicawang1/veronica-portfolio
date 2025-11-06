import LibraryImage from "@/assets/frog.jpg";
import SkygazeImage from "@/assets/frog.jpg";
import TodoImage from "@/assets/frog.jpg";
import { StaticImageData } from "next/image";
import { cache } from "react";

export interface IProjectData {
  SLUG: string;
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE: StaticImageData;
  HIDDEN: boolean;
}

export const DATA = {
  HEADER: {
    NAME: "Veronica",
    AGE: "18",
    PRONOUN: "she/her",
    HEADLINE:
      "passionate about pooping and coding, specializing in Next.js, TypeScript, and Node.js. also the best girlfriend ever",
    RESUME:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Breviceps-adspersus-adspersus.jpg",
    EMAIL: "mailto:veronica.wang@example.com",
    GITHUB: "https://github.com/Veronica-Wang",
    LINKEDIN: "https://www.linkedin.com/in/veronica-wang",
  },

  ABOUT_ME: {
    INTRO:
      "Hey! im veronica. i like food.",
    EXPERTISE:
      "nextjs, tailwind, grpc, trpc, hardware acceleration, quantum mechanics. i specialize in load balancing websocket servers using kubernetes clusters and synchronizing machine states using replicated redis upstash databases.",
    BLOG: "i like writing ",
  },

  EXPERIENCE: {
    "Fumble": {
      WEBSITE: "https://www.fumble.chat/",
      POSITION: "Software Developer",
      LOCATION: "Remote",
      DURATION: "May, 2025 - Present",
      DESCRIPTION: [
        "Learned Next.js, TypeScript, and Tailwind CSS to build a high-performance UI for Fumble.",
        "Hosted and managed servers on AWS EC2, configured domains, and implemented SSL certificates for secure access.",
        "Collaborated with cross-functional teams to design and implement scalable solutions.",
        "Utilized modern frameworks and libraries to ensure responsive and dynamic user interfaces.",
      ],
      TECH_STACK: [
        "TypeScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "ShadCN",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "Contentful",
        "AWS",
        "GCP",
        "Vercel",
        "Nginx",
        "Git & Github",
      ],
    },
    
  },

  PROJECTS: {
    "Boeing Project": {
      SLUG: "boeing-project",
      LIVE_PREVIEW: "https://www.boeing.com/",
      DESCRIPTION: [
        "Presented about VTOLS",
        "",
      ],
      TECH_STACK: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Razorpay",
        "Firebase",
        "GCP",
      ],
      IMAGE: SkygazeImage,
      HIDDEN: false,
    },
    
  },

  ALL_PROJECTS: "https://github.com/Vort3xed",

  BLOGS: {
    "Build your own network exploitation multitool": {
      DATE: "January 1, 2025",
      TIME: "1",
      LINK: "https://medium.com/@agneyat/create-your-own-network-exploitation-multitool-a-step-by-step-guide-part-1-4513d20f5a28",
      DESCRIPTION:
        "break the wifi ",
    },
    
  },

  SKILLS: {
    Languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Node.js"],
    Frameworks: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Astro",
      "Express.js",
      "React Native",
      "Expo",
      "Electron",
      "PWA",
    ],
    Libraries: [
      "React Query",
      "Tailwind CSS",
      "ShadCN UI",
      "Ant Design",
      "Styled Components",
      "Material UI",
    ],
    "Database & Backend": [
      "MongoDB",
      "Redis",
      "Contentful",
      "Firebase",
      "GraphQL",
      "JWT",
      "Auth.js",
      "Clerk",
    ],
    "Cloud & Deployment": [
      "Google Cloud Platform (GCP)",
      "Amazon Web Services (AWS)",
      "Vercel",
    ],
    "Tools & Platforms": [
      "Git",
      "GitHub",
      "Postman",
      "Docker",
      "Visual Studio Code",
      "Prettier",
      "Sentry",
    ],
    "Package Managers & Build Tools": ["NPM", "PNPM", "Yarn", "Bun", "Vite"],
  },
};

export const getProjectData = cache(
  (title: string) =>
    Object.entries(DATA.PROJECTS).find(
      ([, value]) => value.SLUG === title && !value.HIDDEN
    ) as [string, IProjectData] | undefined
);
