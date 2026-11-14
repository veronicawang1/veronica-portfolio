"use client";

import { useEffect, useState } from "react";
import AsciiVeil from "./ascii-veil";

const SECTIONS = [
  { id: "aboutme", label: "about me" },
  { id: "education", label: "education" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "art", label: "art" },
];

const TRACK = 18; // rows in the scroll gauge

// Fills the empty margins beside the page column on wide screens: the purple ASCII glow
// runs down both edges, a section index sits on the left and a scroll gauge on the right.
// All of it stays hidden over the photo wall and fades in once the page scrolls past it.
export function SideRails() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const first = document.getElementById(SECTIONS[0].id);
      const line = window.innerHeight * 0.4;
      setShown(first ? first.getBoundingClientRect().top < window.innerHeight * 0.6 : false);

      // The current section is the last one whose top has passed the reading line.
      let current = 0;
      SECTIONS.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);

      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fadeIn = `transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0 pointer-events-none"}`;
  const marker = Math.round(progress * (TRACK - 1));
  // The glow shows only along the two edges and thins out toward the page column.
  const edges = "linear-gradient(to right, black 0%, transparent 21%, transparent 79%, black 100%)";

  return (
    <div className="max-lg:hidden">
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[-1] ${shown ? "opacity-45" : "opacity-0"} transition-opacity duration-700`}
        style={{ maskImage: edges, WebkitMaskImage: edges }}
      >
        <AsciiVeil fade={false} />
      </div>

      <nav
        aria-label="Sections"
        className={`fixed top-1/2 left-[max(1.5rem,calc(12.5vw-5.5rem))] -translate-y-1/2 max-xl:hidden font-mono text-xs ${fadeIn}`}
      >
        <ul className="flex flex-col gap-2.5">
          {SECTIONS.map((section, i) => (
            <li key={section.id}>
              <a
                href={`/#${section.id}`}
                aria-current={i === active ? "true" : undefined}
                className={`flex items-center gap-2 whitespace-pre ${
                  i === active ? "text-[#fff3cc]" : "text-muted-foreground/60 hover:text-primary"
                }`}
              >
                <span aria-hidden="true" className="text-[#c9b8ff]">
                  {i === active ? ">" : " "}
                </span>
                <span className="text-[#c9b8ff]/70">{String(i + 1).padStart(2, "0")}</span>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        aria-hidden="true"
        className={`fixed top-1/2 right-[max(1.5rem,calc(12.5vw-2rem))] -translate-y-1/2 max-xl:hidden font-mono text-xs text-center leading-[1.15] ${fadeIn}`}
      >
        <pre className="font-mono text-muted-foreground/40">
          {Array.from({ length: TRACK }, (_, row) => (
            <div key={row} className={row === marker ? "text-[#c9b8ff]" : undefined}>
              {row === marker ? "█" : "│"}
            </div>
          ))}
        </pre>
        <p className="mt-2 text-[#c9b8ff]/80">{String(Math.round(progress * 100)).padStart(2, "0")}%</p>
      </div>
    </div>
  );
}
