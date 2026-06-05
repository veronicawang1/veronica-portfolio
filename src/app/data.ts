import LibraryImage from "@/assets/frog.jpg";
import SkygazeImage from "@/assets/frog.jpg";
import TodoImage from "@/assets/frog.jpg";
import { StaticImageData } from "next/image";
import { cache } from "react";

export type ProjectTag = "research" | "ml" | "fullstack" | "systems";

export interface IProjectData {
  SLUG: string;
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  PAPER?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  IMAGE: StaticImageData;
  HIDDEN: boolean;
  TAGS?: ProjectTag[];
  HIGHLIGHTS?: string[];
  VENUE?: string;
  COLLABORATORS?: string[];
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
    "Surgical Phase Recognition for Aneurysm Clipping": {
      SLUG: "surgical-phase-recognition",
      VENUE: "Stanford University · CS231N",
      DESCRIPTION: [
        "Built a two-stage pipeline classifying each second of intraoperative neurosurgery video into one of 4 phases: Brain Exposure, Parent Vessel Identification, Dome & Neck Identification, and Clipping.",
        "Designed NeuroOperA, a causal transformer inspired by OperA — and outperformed it, achieving a Viterbi segmental F1@10 of 0.944 vs. OperA's ~0.80 on its benchmark dataset.",
        "Showed that fine-tuning ResNet50 on surgical frames (vs. frozen ImageNet weights) was the single largest factor: frame accuracy jumped from 53% to 95.7% and F1@10 from 0.553 to 0.895.",
        "Applied Viterbi decoding with a data-driven learned transition matrix, outperforming hand-crafted surgical priors across all thresholds.",
        "Trained and evaluated on 48 intraoperative microscope videos (40,725 labeled frames) with video-level splits to prevent temporal data leakage.",
      ],
      HIGHLIGHTS: [
        "F1@10: 0.944",
        "Frame Acc: 95.7%",
        "Beats OperA",
      ],
      TECH_STACK: ["Python", "PyTorch", "ResNet50", "MS-TCN", "Transformer", "Viterbi Decoding", "t-SNE"],
      TAGS: ["research", "ml"] as ProjectTag[],
      IMAGE: SkygazeImage,
      HIDDEN: false,
    },

    "EvolveGCN-T: Self-Attention for Dynamic Graph Weight Evolution": {
      SLUG: "evolvegcn-t",
      VENUE: "Stanford University · CS229",
      COLLABORATORS: ["Victoria Yang", "Kaci Morris"],
      DESCRIPTION: [
        "Proposed EvolveGCN-T, replacing EvolveGCN's GRU-based weight evolution with a Transformer encoder that self-attends over the explicit history of GCN weight matrices — the first method to apply attention directly to evolving weight sequences rather than node embeddings.",
        "Outperformed the matched recurrent baseline (EvolveGCN-O) on Bitcoin-OTC edge classification: micro-F1 0.783 vs. 0.699, a +8.4 point improvement.",
        "Reproduced published EvolveGCN baselines to within ±1% (Elliptic illicit-F1: 0.578 vs. paper's 0.51; SBM MAP: 0.194 vs. 0.199) before introducing the proposed variant.",
        "Identified optimization instability — not context length — as the primary bottleneck; self-attention showed no consistent benefit from longer history windows, collapsing at h=10.",
        "Evaluated across 3 benchmark datasets: Elliptic (Bitcoin fraud detection), SBM (synthetic link prediction), and Bitcoin-OTC (signed trust network edge classification).",
      ],
      HIGHLIGHTS: [
        "+8.4pt micro-F1 on Bitcoin-OTC",
        "Novel: attention over weight matrices",
        "3 benchmark datasets",
      ],
      TECH_STACK: ["Python", "PyTorch", "Graph Neural Networks", "Transformer", "EvolveGCN", "Weights & Biases", "Scikit-learn"],
      TAGS: ["research", "ml"] as ProjectTag[],
      IMAGE: LibraryImage,
      HIDDEN: false,
    },

    "JobShield: Detecting Fraudulent Job Postings": {
      SLUG: "jobshield",
      VENUE: "Stanford University · CS152",
      COLLABORATORS: ["Yohannes Aklilu", "Anna Roth", "Anayochukwu Edwin Uche", "Victoria Yang"],
      DESCRIPTION: [
        "Built a full-stack job posting platform with a three-layer fraud detection pipeline targeting real malware attack vectors (OtterCookie, FlexibleFerret) that have been active since 2024.",
        "Hybrid LR→LLM pipeline achieved F1 of 0.913, catching 95/100 fraudulent postings while being 4.5× cheaper than using Gemini alone ($0.077/1k vs $0.35/1k).",
        "Three-tier classification: auto-approve (LR score ≤ 0.20), escalate to Gemini 2.5 Flash (uncertain 22%), or auto-block (score ≥ 0.80) — errors always route to a human moderator, never auto-published.",
        "Automatic feedback loop injects every moderator decision as a labeled few-shot example into subsequent LLM calls, enabling continuous improvement without retraining.",
        "Logistic Regression + TF-IDF on posting text plus 8 metadata flags (missing salary, missing requirements, etc.) handles obvious cases in under 0.05ms.",
      ],
      HIGHLIGHTS: [
        "F1: 0.913",
        "4.5× cheaper than LLM-only",
        "95/100 fraud caught",
      ],
      TECH_STACK: ["Next.js", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Scikit-learn", "TF-IDF", "Vercel", "PostgreSQL"],
      TAGS: ["fullstack", "ml"] as ProjectTag[],
      IMAGE: TodoImage,
      HIDDEN: false,
    },

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
      HIDDEN: true,
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
