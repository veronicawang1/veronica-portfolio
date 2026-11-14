import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono, Outfit, Pixelify_Sans } from "next/font/google";
import "./globals.css";

import Puppy from "@/components/ui/puppy";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

// Pixel face for headings, monospace for labels, tags and anything drawn in text characters.
const pixel = Pixelify_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  title: "Veronica Wang",
  description: "CS student at Stanford working on robot learning, world models, and games.",
  openGraph: {
    title: "Veronica Wang | Robotics, World Models & Games",
    description: "CS student at Stanford working on robot learning, world models, and games.",
    url: "https://veronica-wang.vercel.app",
    type: "website",
    images: [
      {
        url: "https://veronica-wang.vercel.app/frog.jpg",
        width: 1200,
        height: 630,
        alt: "Veronica Wang",
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
    "Stanford",
    "Robotics",
    "Robot Learning",
    "Physical AI",
    "World Models",
    "Reinforcement Learning",
    "Isaac Lab",
    "Computer Vision",
    "Generative AI",
    "Games",
    "VR",
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
    <html lang="en" className={`${outfit.variable} ${pixel.variable} ${mono.variable}`} suppressHydrationWarning>
      <body
        className={`${outfit.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Puppy />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
