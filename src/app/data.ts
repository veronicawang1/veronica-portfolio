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
  POSTER?: string;
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
    HEADLINE: "",
    RESUME: "/resume/resume.pdf",
    EMAIL: "mailto:veronicawang2007@gmail.com",
    GITHUB: "https://github.com/veronicawang1",
    LINKEDIN: "https://www.linkedin.com/in/veronica-wang1/",
  },

  ABOUT_ME: {
    INTRO:
      "Hi! I'm Veronica, a CS student at Stanford. I'm drawn to problems relating to visual perception stemming from my interests in computer vision and design. Currently I'm especially interested in using diffusion and generative AI to build realistic world models to use in fields like robotic training, art, games, and HCI.",
    EXPERTISE:
      "I've done research in surgical video understanding (phase recognition with transformers), quantum computing (adiabatic state preparation scaling), and dynamic graph learning. Outside of research I build full-stack products and spend time on graphic design and studio art. Currently mainly working in C++ and learning 3D rendering plus AI/ML.",
    BLOG: "",
  },

  EDUCATION: [
    {
      SCHOOL: "Stanford University",
      DEGREE: "B.S. Computer Science",
      LOCATION: "Stanford, CA",
      DURATION: "2025 – 2029",
    },
  ],

  EXPERIENCE: {
    "Boeing": {
      WEBSITE: "https://www.boeing.com",
      POSITION: "Software Engineering Intern",
      LOCATION: "Seattle, WA",
      DURATION: "June 2026 – August 2026",
      DESCRIPTION: [
        "Implemented ramoops kernel crash persistence and designed a live serial logging system for the P-8 aircraft mission computer, allowing system states and kernel logs across 45 systems to be preserved for debugging.",
        "Worked with hardware to identify active console ports and evaluated a screen based approach to log each console session with tmux/telnet session management, systemd startup, and logrotate retention.",
      ],
      TECH_STACK: ["C", "C++", "Python", "Bash", "Perl", "Mission Systems", "Virtual Integration"],
    },

    "Quantum Computing Research": {
      PAPER: "https://link.springer.com/article/10.1140/epja/s10050-026-01879-4?utm_source=rct_congratemailt&utm_medium=email&utm_campaign=oa_20260623&utm_content=10.1140/epja/s10050-026-01879-4",
      CITATION: "Cohen, T.D., Oh, H. & Wang, V. Numerical study of computational cost of maintaining adiabaticity for long paths. Eur. Phys. J. A 62, 122 (2026). https://doi.org/10.1140/epja/s10050-026-01879-4",
      POSITION: "Research Author",
      LOCATION: "College Park, MD",
      DURATION: "May 2024 – October 2024",
      COLLABORATORS: ["Thomas D. Cohen (UMD)", "Hyunwoo Oh (UMD)"],
      DESCRIPTION: [
        "Accepted to European Physical Journal A: Hadrons and Nuclei (EPJA-108258.R2).",
        "Co-authored with physicists at the University of Maryland, providing numerical evidence for a conjecture about the computational cost of adiabatic quantum state preparation.",
        "Demonstrated that the cost proxy Q_D scales as L log L (superlinear) in path length L, confirming the conjecture that adiabatic state preparation is generically more expensive than linear-scaling alternatives as system size grows.",
        "Built a simulation pipeline to orchestrate 1k+ runs with strict 10% error gates and validated results across 3 independent proxy formulations and multiple Hamiltonian draws to ensure the scaling behavior was robust.",
      ],
      TECH_STACK: ["Python", "Mathematica", "Quantum Simulation", "Adiabatic Theorem", "Numerical Methods"],
    },
  },

  PROJECTS: {
    "Surgical Phase Recognition for Aneurysm Clipping": {
      SLUG: "surgical-phase-recognition",
      PAPER: "/posters_papers/cs231n-paper.pdf",
      POSTER: "/posters_papers/cs231n-poster.pdf",
      VENUE: "Stanford University · CS231N",
      COLLABORATORS: ["Emily Oberleitner", "Nicole Wong", "Dr. Jinendra Ekanayake"],
      DESCRIPTION: [
        "Collaborated with Stanford School of Medicine.",
        "Sourced a proprietary dataset of 48 intraoperative microscope videos (40,725 labeled frames) of aneurysm clipping surgery, annotated using CVAT across 4 surgical phases: Brain Exposure, Parent Vessel Identification, Dome & Neck Identification, and Clipping. Used video-level train/val splits to prevent temporal data leakage.",
        "Designed NeuroOperA, a causal transformer for phase recognition adapted from the laparoscopic OperA — and outperformed it, achieving a Viterbi segmental F1@10 of 0.944 vs. OperA's ~0.80. Also implemented MS-TCN (which OperA did not), achieving ~95% validation accuracy vs. OperA's 92%.",
        "Showed that fine-tuning ResNet50 on surgical frames (vs. frozen ImageNet weights) was the single largest factor: frame accuracy jumped from 53% to 95.7% and F1@10 from 0.553 to 0.895.",
        "Applied Viterbi decoding with a data-driven learned transition matrix, outperforming hand-crafted surgical priors across all thresholds.",
      ],
      HIGHLIGHTS: [
        "F1@10: 0.944",
        "Best Val Acc: 95.7%",
        "Edit Dist: 0.809",
      ],
      TECH_STACK: ["Python", "PyTorch", "ResNet50", "MS-TCN", "Transformer", "Viterbi Decoding", "CVAT", "t-SNE", "Confusion Matrix", "Ablation Study", "GCP"],
      TAGS: ["research", "ml"] as ProjectTag[],
      IMAGE: SkygazeImage,
      HIDDEN: false,
    },

    "EvolveGCN-T: Self-Attention for Dynamic Graph Weight Evolution": {
      SLUG: "evolvegcn-t",
      PAPER: "/posters_papers/cs229-paper.pdf",
      VENUE: "Stanford University · CS229",
      COLLABORATORS: ["Victoria Yang", "Kaci Morris"],
      DESCRIPTION: [
        "Proposed EvolveGCN-T, replacing EvolveGCN's GRU-based weight evolution with a Transformer encoder that self-attends over the explicit history of GCN weight matrices rather than node embeddings.",
        "Outperformed the matched recurrent baseline (EvolveGCN-O) on Bitcoin-OTC edge classification: micro-F1 0.783 vs. 0.699, a +8.4 point improvement.",
        "Reproduced published EvolveGCN baselines to within ±1% (Elliptic illicit-F1: 0.578 vs. paper's 0.51; SBM MAP: 0.194 vs. 0.199) before introducing the proposed variant.",
        "Identified optimization instability as the primary bottleneck since self-attention showed no consistent benefit from longer history windows.",
        "Evaluated across SBM (synthetic link prediction) and Bitcoin-OTC (signed trust network edge classification).",
      ],
      HIGHLIGHTS: [
        "+8.4pt micro-F1 on Bitcoin-OTC",
        "GRU → Transformer weight evolution",
        "Reproduced baselines to ±1%",
      ],
      TECH_STACK: ["Python", "PyTorch", "Graph Neural Networks", "Transformer", "EvolveGCN", "Weights & Biases", "Scikit-learn", "Docker", "GCP"],
      TAGS: ["research", "ml"] as ProjectTag[],
      IMAGE: LibraryImage,
      HIDDEN: false,
    },

    "JobShield: Detecting Fraudulent Job Postings": {
      SLUG: "jobshield",
      POSTER: "/posters_papers/jobshield-poster.pdf",
      VENUE: "Stanford University · Team 19",
      COLLABORATORS: ["Yohannes Aklilu", "Anna Roth", "Anayochukwu Edwin Uche", "Victoria Yang"],
      DESCRIPTION: [
        "Built a full-stack job posting platform with a three-layer fraud detection pipeline targeting real malware attack vectors (OtterCookie, FlexibleFerret) that have been active since 2024.",
        "Hybrid LR→LLM pipeline achieved F1 of 0.913, catching 95/100 fraudulent postings while being 4.5× cheaper than using Gemini alone ($0.077/1k vs $0.35/1k).",
        "Automatic feedback loop injects every moderator decision as a labeled few-shot example into subsequent LLM calls, enabling continuous improvement without retraining.",
        "Logistic Regression + TF-IDF on posting text plus 8 metadata flags (missing salary, missing requirements, etc.) handles most cases in under 0.05ms.",
      ],
      HIGHLIGHTS: [
        "F1: 0.913",
        "4.5× cheaper than LLM-only",
        "95/100 fraud caught",
      ],
      TECH_STACK: ["Next.js", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Scikit-learn", "TF-IDF", "Vercel", "PostgreSQL", "GCP"],
      TAGS: ["fullstack", "ml"] as ProjectTag[],
      IMAGE: TodoImage,
      HIDDEN: false,
    },

    "Computational Cost of Adiabatic State Preparation": {
      SLUG: "adiabatic-state-preparation",
      PAPER: "https://arxiv.org/abs/2412.08626",
      VENUE: "arXiv:2412.08626 · University of Maryland",
      COLLABORATORS: ["Thomas D. Cohen (UMD)", "Hyunwoo Oh (UMD)"],
      DESCRIPTION: [
        "Accepted to European Physical Journal A: Hadrons and Nuclei (EPJA-108258.R2).",
        "Co-authored with physicists at the University of Maryland, providing numerical evidence for a conjecture about the computational cost of adiabatic quantum state preparation.",
        "Demonstrated that the cost proxy Q_D scales as L log L (superlinear) in path length L, confirming the conjecture that adiabatic state preparation is generically more expensive than linear-scaling alternatives as system size grows.",
        "Built a simulation pipeline to orchestrate 1k+ runs with strict 10% error gates and validated results across 3 independent proxy formulations and multiple Hamiltonian draws to ensure the scaling behavior was robust.",
      ],
      HIGHLIGHTS: [
        "Accepted: EPJ A",
        "Q_D ~ L log L confirmed",
      ],
      TECH_STACK: ["Python", "Mathematica", "Quantum Simulation", "Adiabatic Theorem"],
      TAGS: ["research"] as ProjectTag[],
      IMAGE: LibraryImage,
      HIDDEN: true,
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

    "Chimes: Assistive Audio ID Device": {
      SLUG: "chimes",
      VENUE: "Chimes · Contract",
      DESCRIPTION: [
        "Designed an RFID-based audio identification device for visually impaired custodial employees at Chimes, a nonprofit employing people with disabilities — helping workers safely distinguish cleaning chemicals without relying on color or label recognition.",
        "Built a two-ESP32 pipeline: an RFID reader identifies tagged equipment and transmits the ID via ESP-NOW to a receiver ESP32, which matches it to an audio file on an SD card and plays it through a 3D-printed speaker enclosure.",
        "Ran a blindfolded user study with 6 participants across 6 trials — participants identified 5 chemicals 30.1% faster with the device; iterated on the design based on results, adding tactile attachment points and upgrading to an external speaker module.",
        "CAD-modeled a custom speaker enclosure in OnShape with honeycomb mesh acoustics, easy-repair access, and structural independence; housed the receiver ESP32, serial MP3 module, and speaker driver inside.",
        "Device was designed to scale to hundreds of employees across Chimes locations.",
      ],
      HIGHLIGHTS: [
        "30.1% faster ID",
        "6-participant user study",
      ],
      TECH_STACK: ["ESP32", "RFID", "ESP-NOW", "C++", "Arduino", "OnShape", "CAD", "3D Printing", "Raspberry Pi"],
      IMAGE: SkygazeImage,
      HIDDEN: false,
    },

  },

  ALL_PROJECTS: "https://github.com/veronicawang1",

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
    Languages: ["Python", "JavaScript", "TypeScript", "HTML/CSS", "LaTeX", "C++", "C", "Java", "x86"],
    "ML & AI": [
      "PyTorch",
      "Scikit-learn",
      "ResNet50",
      "Transformers",
      "RNNs",
      "Graph Neural Networks",
      "MS-TCN",
      "TF-IDF",
      "Viterbi Decoding",
      "Weights & Biases",
    ],
    "Web & Full-Stack": [
      "React.js",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Express.js",
    ],
    "Data & Backend": [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Excel",
    ],
    "Cloud & Tools": [
      "AWS",
      "Vercel",
      "GCP",
      "Git",
      "Docker",
      "CVAT",
    ],
    "Quantum & Scientific Computing": [
      "Adiabatic state preparation",
      "Quantum simulation",
      "NumPy",
      "SciPy",
    ],
    Engineering: [
      "OnShape",
      "Fusion 360",
      "3D Printing",
      "Woodworking",
      "Soldering",
      "Arduino",
      "Raspberry Pi",
      "CNC",
    ],
    Design: ["Figma", "Procreate", "Procreate Dreams"],
  },

  ART: {
    PIECES: [
      {
        title: "Figure",
        medium: "Oil on canvas",
        year: "2024",
        image: "/art/figure-sun.jpg",
      },
      {
        title: "Turbulence",
        medium: "Oil on canvas",
        year: "2024",
        award: "Oil Painters of America — Show #84271",
        image: "/art/turbulence.jpg",
      },
      {
        title: "Long-tailed Duck",
        medium: "Acrylic on gessobord",
        year: "2023",
        award: "FWS Junior Duck Stamp — MD State runner-up, national traveling display",
        image: "/art/duck-long-tailed.jpg",
      },
      {
        title: "Forrest",
        medium: "Oil on canvas",
        year: "2024",
        award: "Blue Marble Review — Issue 36",
        image: "/art/forrest.jpg",
      },
      {
        title: "Untitled",
        medium: "Charcoal",
        year: "2025",
        image: "/art/farmers-buffalo.jpg",
      },
      {
        title: "White-cheeked Pintails",
        medium: "Oil on gessobord",
        year: "2023",
        award: "FWS Junior Duck Stamp — MD State runner-up, national traveling display",
        image: "/art/ducks-spot-billed.jpg",
      },
      {
        title: "Playdate",
        medium: "Colored pencil",
        year: "2021",
        award: "Celebrating Art Magazine — High Merit",
        image: "/art/duckling.jpg",
      },
      {
        title: "Greater",
        medium: "Colored pencil",
        year: "2022",
        award: "Congressional Art Contest — Best Drawing, Poolesville HS",
        image: "/art/greater.png",
      },
      {
        title: "Triptych",
        medium: "Ink and digital",
        year: "2024",
        image: "/art/triptych-portrait.jpg",
      },
      {
        title: "Paths",
        medium: "Oil on canvas",
        year: "2023",
        award: "Blue Marble Review — Cover art",
        image: "/art/paths.jpg",
      },
      {
        title: "Peonies",
        medium: "Oil on canvas",
        year: "2022",
        image: "/art/peonies-jar.jpg",
      },
      {
        title: "Suzhou Canal",
        medium: "Oil on canvas",
        year: "2025",
        image: "/art/suzhou-canal.jpg",
      },
      {
        title: "Garden Path",
        medium: "Watercolor",
        year: "2024",
        image: "/art/garden-path.jpg",
      },
      {
        title: "For Grandpa",
        medium: "Procreate",
        year: "2024",
        image: "/art/willow-lake.jpg",
      },
      {
        title: "Metamorphosis",
        medium: "Ink and gelly pen",
        year: "2022",
        image: "/art/shoe-ink.jpg",
      },
      {
        title: "Slopes",
        medium: "Colored pencil",
        year: "2026",
        image: "/art/slopes.jpg",
      },
      {
        title: "Forrest W.I.P",
        medium: "Acrylic",
        year: "2026",
        image: "/art/forrest-wip.jpg",
      },
      {
        title: "Pebbles",
        medium: "Oil on gessobord",
        year: "2022",
        image: "/art/pebbles.jpg",
      },
      {
        title: "Persimmon",
        medium: "Procreate",
        year: "2024",
        image: "/art/persimmon.jpg",
      },
      {
        title: "Face",
        medium: "Acrylic",
        year: "2022",
        image: "/art/face.jpg",
      },
      {
        title: "Field",
        medium: "Watercolor",
        year: "2024",
        image: "/art/field.jpg",
      },
      {
        title: "Still Life",
        medium: "Watercolor",
        year: "2023",
        image: "/art/still-life.jpg",
      },
      {
        title: "Flower",
        medium: "Watercolor",
        year: "2021",
        image: "/art/flower.jpg",
      },
      {
        title: "W.I.P",
        medium: "Oil pastel",
        year: "2026",
        image: "/art/wip-oil-pastel.jpg",
      },
      {
        title: "Blue",
        medium: "Watercolor",
        year: "2021",
        image: "/art/blue.jpg",
      },
      {
        title: "Canal W.I.P",
        medium: "Oil on gessobord",
        year: "2026",
        image: "/art/canal-wip.jpg",
      },
    ],
    FEATURED: [
      {
        publication: "Blue Marble Review",
        title: "Paths",
        description: "Cover art",
        year: "2024",
        url: "https://bluemarblereview.com/category/cover-art/",
      },
      {
        publication: "Blue Marble Review",
        title: "Forrest",
        description: "Issue 36 cover",
        year: "2024",
        url: "https://bluemarblereview.com/wp-content/uploads/2024/12/dec-2024-issue36-compressed.pdf",
      },
      {
        publication: "Oil Painters of America",
        title: "Turbulence",
        description: "16\"×20\" oil — Show #84271",
        year: "2024",
        url: "https://blog.oilpaintersofamerica.com/show-gallery/?show=84271&pagenum=2",
      },
      {
        publication: "Congressional Art Contest",
        title: "Greater",
        description: "Best Drawing — Poolesville HS, Rep. David Trone MD-06",
        year: "2022",
        url: "https://mocoshow.com/2022/06/07/mcps-students-win-congressional-art-contest/",
      },
      {
        publication: "FWS Junior Duck Stamp",
        title: "Long-tailed Duck",
        description: "MD State runner-up — national traveling display",
        year: "2022",
        url: "https://www.fws.gov/sites/default/files/documents/JDS%20Placing%20Art%202022.pdf",
      },
      {
        publication: "FWS Junior Duck Stamp",
        title: "White-cheeked Pintails",
        description: "MD State runner-up — national traveling display",
        year: "2023",
        url: "https://www.fws.gov/sites/default/files/documents/JDS-MD-Placing-Art-2023-blackwater-nwr_1.pdf",
      },
      {
        publication: "Celebrating Art Magazine",
        title: "Summer",
        description: "High Merit — Summer 2021",
        year: "2021",
        url: "https://www.celebratingart.com/high-merit",
      },
    ],
  },
};

export const getProjectData = cache(
  (title: string) =>
    Object.entries(DATA.PROJECTS).find(
      ([, value]) => value.SLUG === title && !value.HIDDEN
    ) as [string, IProjectData] | undefined
);
