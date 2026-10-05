"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { MovingElement } from "../navbar";
import { CollageBoard, PINNED } from "./collage-board";

const LETTER_STAGGER = 0.045;
// The greeting starts as the board dims, once every photo is pinned.
const TEXT_DELAY = PINNED + 0.25;

// Drops text in one letter at a time, starting at `start` seconds.
function LetterDrop({
  text,
  start,
  play,
  className,
}: {
  text: string;
  start: number;
  play: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text); // keeps emoji intact

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: "-0.9em", rotate: -8 }}
          animate={play ? { opacity: 1, y: 0, rotate: 0 } : undefined}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  delay: start + i * LETTER_STAGGER,
                  type: "spring",
                  stiffness: 420,
                  damping: 18,
                  opacity: { delay: start + i * LETTER_STAGGER, duration: 0.15 },
                }
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const GREETING = "hi there👋, I'm";
const NAME = "Veronica";

export function Header({ data }: { data: Record<string, string> }) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  const nameStart = TEXT_DELAY + Array.from(GREETING).length * LETTER_STAGGER;
  const buttonsStart = nameStart + NAME.length * LETTER_STAGGER + 0.15;

  const buttons = [
    <MovingElement
      key="resume"
      className="inline-flex justify-center items-center bg-primary betterhover:hover:bg-primary/90 disabled:opacity-50 shadow px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-primary-foreground text-sm whitespace-nowrap transition-colors disabled:pointer-events-none"
      change={() => handleChange(data.RESUME)}
      toChange={false}
      ariaLabel="Resume"
    >
      Resume
    </MovingElement>,
    <MovingElement key="email" change={() => handleChange(data.EMAIL)} ariaLabel="Email">
      <Mail />
    </MovingElement>,
    <MovingElement key="github" change={() => handleChange(data.GITHUB)} ariaLabel="Github">
      <Github />
    </MovingElement>,
    <MovingElement key="linkedin" change={() => handleChange(data.LINKEDIN)} ariaLabel="Linkedin">
      <Linkedin />
    </MovingElement>,
  ];

  return (
    // Spans the full window width and clips sideways, so photos flying in from
    // off screen never make the page scroll horizontally.
    <section className="left-1/2 relative flex justify-center pt-12 w-screen overflow-x-clip -translate-x-1/2">
      {/* Grows past the page column on wide windows, but stays within the window's width and height. */}
      <div className="relative w-[min(1080px,calc(100vw-32px),calc((100svh-130px)*1.36))] shrink-0">
        <CollageBoard onStart={() => setPlay(true)} />

        {/* Greeting and links sit centered on top of the dimmed board. */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 px-4 text-center pointer-events-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          <p className="font-normal text-primary/85 text-base">
            <LetterDrop text={GREETING} start={TEXT_DELAY} play={play} />
          </p>

          <h1 className="font-semibold text-[clamp(2.4rem,7vw,4.6rem)] leading-tight">
            <LetterDrop text={NAME} start={nameStart} play={play} />
          </h1>
          {data.HEADLINE && (
            <h2 className="mt-1 font-normal text-primary/90 text-base">{data.HEADLINE}</h2>
          )}

          <div className="flex items-center gap-2 pt-2 text-sm pointer-events-auto">
            {buttons.map((button, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -28 }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { delay: buttonsStart + i * 0.08, type: "spring", stiffness: 380, damping: 20 }
                }
              >
                {button}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
