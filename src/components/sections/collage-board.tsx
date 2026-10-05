"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ALTS = [
  "at the Palace of Fine Arts",
  "with a golden retriever",
  "holding certificates with friends",
  "in a green frog hat",
  "with friends overlooking a city at dusk",
  "with a friend in Yosemite",
  "at graduation with friends",
  "at sunset by a stadium",
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
];

// Deterministic pseudo-random numbers in [-1, 1], so every load (and the server render) matches.
function jitter(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

export const PHOTOS = ALTS.map((alt, i) => ({
  src: `/collage/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Veronica ${alt}`,
  // A loose, hand-pinned look: each print is nudged and tilted within its own cell,
  // and scaled down a little so even the largest nudges never reach a neighbor.
  rotate: Math.round(jitter(i + 1) * 80) / 10, // up to ±8°
  dx: Math.round(jitter(i + 101) * 8), // % of the cell
  dy: Math.round(jitter(i + 201) * 8),
  scale: 0.68 + Math.round((jitter(i + 301) + 1) * 5) / 100, // 0.68–0.78
}));

const PIN_COLORS = ["#ef4444", "#f5c542", "#3b82f6", "#22c55e", "#ec4899", "#a855f7"];

export const BOARD_IN = 0.45; // board fades in
export const PHOTO_STAGGER = 0.055;
export const FLIGHT = 0.75;
export const PIN_TIME = 0.4;
// When the last pin is stuck in.
export const PINNED = BOARD_IN + PHOTO_STAGGER * (PHOTOS.length - 1) + FLIGHT + PIN_TIME;
export const BOARD_FULL = 0.72; // a touch see-through so it isn't glaring on the dark page
export const BOARD_DIM = 0.32;

function Pin({ color, delay, play, reduce }: { color: string; delay: number; play: boolean; reduce: boolean }) {
  return (
    <span aria-hidden="true" className="top-[3%] left-1/2 z-10 absolute size-[clamp(9px,1.4vw,13px)] -translate-x-1/2">
      {/* Shadow: wide and offset while the pin is in the air, tight once it's stuck in. */}
      <motion.span
        className="absolute inset-0 bg-black/45 blur-[1.5px] rounded-full"
        initial={{ opacity: 0, x: 14, y: 16, scale: 1.8 }}
        animate={play ? { opacity: 1, x: 1.5, y: 2.5, scale: 1 } : undefined}
        transition={reduce ? { duration: 0 } : { delay, duration: PIN_TIME * 0.7, ease: [0.5, 0, 0.75, 0] }}
      />
      {/* Head: drops from above, shrinking as it approaches, then squashes on impact. */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #ffffffcc 0 16%, ${color} 24%, ${color} 70%, #0000004d 100%)`,
        }}
        initial={{ opacity: 0, y: -42, scale: 2.2 }}
        animate={play ? { opacity: 1, y: 0, scale: [2.2, 1, 0.82, 1] } : undefined}
        transition={
          reduce
            ? { duration: 0 }
            : {
                y: { delay, duration: PIN_TIME * 0.7, ease: [0.5, 0, 0.75, 0] },
                scale: { delay, duration: PIN_TIME, times: [0, 0.7, 0.85, 1] },
                opacity: { delay, duration: 0.08 },
              }
        }
      />
    </span>
  );
}

export function CollageBoard({ onStart }: { onStart?: () => void }) {
  const reduce = Boolean(useReducedMotion());
  const [loaded, setLoaded] = useState(0);
  const [play, setPlay] = useState(false);
  const [travel, setTravel] = useState(1400);
  const onStartRef = useRef(onStart);
  onStartRef.current = onStart;

  // Start once the photos have loaded, or after a short timeout on slow connections.
  useEffect(() => {
    if (play) return;
    const go = () => {
      setTravel(Math.max(window.innerWidth, window.innerHeight) * 1.1);
      setPlay(true);
      onStartRef.current?.();
    };
    if (reduce || loaded >= PHOTOS.length) return go();
    const t = window.setTimeout(go, 2500);
    return () => window.clearTimeout(t);
  }, [loaded, reduce, play]);

  const total = PINNED + 0.9;

  return (
    <motion.div
      className="relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-[clamp(10px,2.4vw,22px)] rounded-xl w-full"
      style={{
        backgroundColor: "#efe7d8",
        backgroundImage:
          "radial-gradient(rgba(120,95,60,0.10) 1px, transparent 1.2px), radial-gradient(rgba(120,95,60,0.06) 1px, transparent 1.2px)",
        backgroundSize: "7px 7px, 11px 11px",
        backgroundPosition: "0 0, 3px 5px",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={play ? { opacity: [0, BOARD_FULL, BOARD_FULL, BOARD_DIM], scale: 1 } : undefined}
      transition={
        reduce
          ? { duration: 0 }
          : {
              // Fade in, hold while photos are pinned, then dim behind the greeting.
              opacity: { duration: total, times: [0, BOARD_IN / total, PINNED / total, 1] },
              scale: { duration: BOARD_IN, ease: "easeOut" },
            }
      }
    >
      <div className="gap-[clamp(6px,1.4vw,14px)] grid grid-cols-4 sm:grid-cols-6">
        {PHOTOS.map((photo, i) => {
          // Spread the entry directions around the circle (golden angle).
          const angle = (i * 137.5 * Math.PI) / 180;
          const delay = BOARD_IN + i * PHOTO_STAGGER;
          const pinAt = delay + FLIGHT;
          const spin = (i % 2 === 0 ? 1 : -1) * (25 + ((i * 7) % 20));

          return (
            <div
              key={photo.src}
              style={{ transform: `translate(${photo.dx}%, ${photo.dy}%) scale(${photo.scale})` }}
            >
              <motion.div
                className="relative"
                initial={{
                  // Rounded so the server and browser render identical styles.
                  x: Math.round(Math.cos(angle) * travel),
                  y: Math.round(Math.sin(angle) * travel),
                  scale: 2.4,
                  rotate: photo.rotate + spin,
                  opacity: 0,
                }}
                animate={play ? { x: 0, y: 0, scale: 1, rotate: photo.rotate, opacity: 1 } : undefined}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { delay, duration: FLIGHT, ease: [0.16, 1, 0.3, 1], opacity: { delay, duration: 0.2 } }
                }
              >
                {/* Dips slightly when its pin goes in. */}
                <motion.div
                  className="bg-white shadow-[0_3px_8px_rgba(60,40,10,0.35)] p-[6%] pb-[16%]"
                  animate={play && !reduce ? { scale: [1, 1, 0.95, 1] } : undefined}
                  transition={{ delay: pinAt, duration: PIN_TIME + 0.15, times: [0, 0.62, 0.78, 1] }}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 22vw, 130px"
                      className="object-[center_30%] object-cover"
                      priority={i < 6}
                      onLoad={() => setLoaded((n) => n + 1)}
                    />
                  </div>
                </motion.div>
                <Pin color={PIN_COLORS[i % PIN_COLORS.length]} delay={pinAt} play={play} reduce={reduce} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
