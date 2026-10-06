"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { MovingElement } from "../navbar";
import { CollageBoard } from "./collage-board";

const LETTER_STAGGER = 0.03;
const TEXT_START = 0.15;

// Drops text in one letter at a time with CSS, so it plays as soon as the page paints.
function LetterDrop({ text, start }: { text: string; start: number }) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="letter-drop"
          style={{ animationDelay: `${(start + i * LETTER_STAGGER).toFixed(3)}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

const GREETING = "hi there👋, I'm";
const NAME = "Veronica";

export function Header({ data }: { data: Record<string, string> }) {
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  const nameStart = TEXT_START + Array.from(GREETING).length * LETTER_STAGGER;
  const buttonsStart = nameStart + NAME.length * LETTER_STAGGER + 0.1;

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
        <CollageBoard />

        {/* Greeting and links sit centered on the board from the very first paint; a soft dark
            glow keeps them readable while the board behind is still bright. */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 px-4 text-center pointer-events-none [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          <div
            aria-hidden="true"
            className="-z-10 absolute w-[min(560px,90%)] h-[min(300px,60%)]"
            style={{ background: "radial-gradient(ellipse at center, rgba(8,8,14,0.6) 0%, rgba(8,8,14,0.35) 45%, transparent 72%)" }}
          />
          <p className="font-normal text-primary/85 text-base">
            <LetterDrop text={GREETING} start={TEXT_START} />
          </p>

          <h1 className="font-semibold text-[clamp(2.4rem,7vw,4.6rem)] leading-tight">
            <LetterDrop text={NAME} start={nameStart} />
          </h1>
          {data.HEADLINE && (
            <h2 className="mt-1 font-normal text-primary/90 text-base">{data.HEADLINE}</h2>
          )}

          <div className="flex items-center gap-2 pt-2 text-sm pointer-events-auto">
            {buttons.map((button, i) => (
              <div key={i} className="drop-in" style={{ animationDelay: `${(buttonsStart + i * 0.06).toFixed(2)}s` }}>
                {button}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
