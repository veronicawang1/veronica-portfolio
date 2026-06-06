import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import "./globals.css";

import GridPattern from "@/components/ui/grid-pattern";
import Galaxy from "@/blocks/Backgrounds/Galaxy/Galaxy";
import Beams from "@/blocks/Backgrounds/Beams/Beams";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Veronica Wang",
  description:
    "Software developer",
  openGraph: {
    title: "Veronica Wang | Software Developer",
    description:
      "Software developer specializing in Next.js, TypeScript, and Node.js. Experienced in building scalable, high-performance applications.",
    url: "https://veronica-wang.vercel.app",
    type: "website",
    images: [
      {
        url: "https://veronica-wang.vercel.app/frog.jpg",
        width: 1200,
        height: 630,
        alt: "Veronica Wang | Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  authors: [
    { name: "Veronica Wang", url: "https://veronica-wang.vercel.app/" },
  ],
  keywords: [
    "Veronica Wang",
    "Software Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "GCP",
    "MongoDB",
    "Firebase",
    "Tailwind CSS",
    "Web Development",
  ],
  creator: "Veronica Wang",
  publisher: "Veronica Wang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <body
        className={`${outfit.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
