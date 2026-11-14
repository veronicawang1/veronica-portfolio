"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ASPECTS, LAYOUTS, STRINGS } from "./collage-layout";

const ALTS = [
  "at the Palace of Fine Arts",
  "with a golden retriever",
  "holding certificates with friends",
  "in a green frog hat",
  "with friends overlooking a city at dusk",
  "with a friend in Yosemite",
  "at graduation with friends",
  "overlooking a city at night",
  "with friends holding snacks",
  "as a child in sunglasses",
  "with friends in a sunlit hall",
  "with a dog outside her high school",
  "hugging a friend at sunset",
  "with a friend at home",
  "with friends on a hill at dusk",
  "with a friend in a grand hall",
  "by balloon palm trees",
  "at a concert with a friend",
  "at dinner",
  "at graduation with family",
  "in a knit hat with friends",
  "at a formal with friends",
  "with a friend in a lobby",
  "with a friend at a formal under balloons",
];

// File numbers in /public/collage, in the same order as ALTS. Numbers are never reused,
// so a cached copy of a removed photo can't show up in place of a new one.
const FILES = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26];

export const PHOTOS = ALTS.map((alt, i) => ({
  src: `/collage/photo-${String(FILES[i]).padStart(2, "0")}.jpg`,
  alt: `Veronica ${alt}`,
  aspect: ASPECTS[i],
}));

// "Seaglass kiss" palette.
const PIN_COLORS = ["#E8B86C", "#FDD6CF", "#FDADA4", "#A880A0", "#619394"];

// Small deterministic pseudo-random numbers in [0, 1) for sway timing.
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Pin({ color }: { color: string }) {
  return (
    // Sits on the print's top border, with a tight shadow under its head.
    <span aria-hidden="true" className="top-0 left-1/2 z-10 absolute size-[clamp(7px,0.9vw,11px)] -translate-x-1/2 -translate-y-[10%]">
      <span className="absolute inset-0 bg-black/45 blur-[1.5px] rounded-full translate-x-[1.5px] translate-y-[2.5px]" />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #ffffffcc 0 16%, ${color} 24%, ${color} 70%, #0000004d 100%)`,
        }}
      />
    </span>
  );
}

// A little wooden clothes peg that clips a print onto its string.
function Peg() {
  return (
    <span
      aria-hidden="true"
      className="top-0 left-1/2 z-10 absolute rounded-[1.5px] w-[clamp(4px,0.5vw,6px)] h-[clamp(11px,1.4vw,17px)] -translate-x-1/2 -translate-y-[45%]"
      style={{
        background: "linear-gradient(90deg, #b88a55 0 42%, #6e4f2c 42% 58%, #c99a62 58% 100%)",
        boxShadow: "1px 2px 3px rgba(0,0,0,0.5)",
      }}
    />
  );
}

// Thin strings sagging across the wall, behind the prints.
function Strings({ paths }: { paths: readonly string[] }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 overflow-visible size-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.map((d) => (
        <path key={d} d={d} fill="none" stroke="#cbb9ff" strokeOpacity={0.55} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

// A wall of prints: some clipped onto strings, the rest pinned, all overlapping. Both
// layouts are rendered and CSS shows the one that fits, so the wall is right from the
// first paint with nothing to animate in.
export function CollageBoard() {
  return (
    <>
      <Wall layout="narrow" className="sm:hidden aspect-[0.5]" />
      <Wall layout="wide" className="max-sm:hidden aspect-[1.5]" />
    </>
  );
}

function Wall({ layout, className }: { layout: "wide" | "narrow"; className: string }) {
  const wall = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);
  // Prints that have been picked up, oldest first: the latest sits on top.
  const [lifted, setLifted] = useState<number[]>([]);

  // Prints can be dragged around with a mouse; on touch screens a drag would fight
  // with scrolling the page.
  useEffect(() => {
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanDrag(mouse.matches);
    update();
    mouse.addEventListener("change", update);
    return () => mouse.removeEventListener("change", update);
  }, []);

  const lift = useCallback((i: number) => setLifted((l) => (l[l.length - 1] === i ? l : [...l.filter((n) => n !== i), i])), []);

  return (
    <div ref={wall} className={`isolate relative w-full ${className}`}>
      <Strings paths={STRINGS[layout]} />

      {PHOTOS.map((photo, i) => {
        const spot = LAYOUTS[layout][i];
        const order = lifted.indexOf(i);

        return (
          <div
            key={photo.src}
            className="absolute"
            style={{
              left: `${spot.left}%`,
              top: `${spot.top}%`,
              width: `${spot.width}%`,
              zIndex: order === -1 ? spot.z : 30 + order,
              rotate: `${spot.rotate}deg`,
              // A hung print turns about its peg, so its top stays on the string.
              transformOrigin: spot.hung ? "50% 0%" : "50% 50%",
            }}
          >
            <motion.div
              className={canDrag ? "cursor-grab active:cursor-grabbing" : undefined}
              drag={canDrag}
              dragConstraints={wall}
              dragElastic={0.25}
              dragMomentum={false}
              whileHover={canDrag ? { scale: 1.04 } : undefined}
              whileDrag={{ scale: 1.08, rotate: -spot.rotate }}
              onPointerDown={() => lift(i)}
            >
              {/* Hung prints sway a little on their pegs. */}
              <div
                className={spot.hung ? "print-sway" : undefined}
                style={
                  spot.hung
                    ? {
                        animationDuration: `${(4.5 + rand(i + 3) * 3).toFixed(2)}s`,
                        animationDelay: `${(-rand(i + 17) * 6).toFixed(2)}s`,
                      }
                    : undefined
                }
              >
                {/* Dimmed so the wall sits back behind the greeting; a print lights up under the cursor. */}
                <div className="bg-[#f6f3ea] shadow-[0_6px_16px_rgba(0,0,0,0.55)] p-[4.5%] brightness-[0.55] hover:brightness-100 transition-[filter] duration-300">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: photo.aspect }}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={layout === "narrow" ? "30vw" : "200px"}
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
                {spot.hung ? <Peg /> : <Pin color={PIN_COLORS[i % PIN_COLORS.length]} />}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
