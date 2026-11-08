"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import useMobileDetection from "@/hooks/use-mobile";
import {
  BASKET_BACK,
  BASKET_FRONT,
  HOUSE,
  HOUSE_PEEK,
  PALETTE,
  SPRITE_COLS,
  SPRITE_ROWS,
  TOY_ART,
  dogSprite,
  houseSprite,
  type Look,
  type ToyKind,
} from "./puppy-sprites";

const PX = 3; // screen pixels per sprite pixel
const DOG_W = SPRITE_COLS * PX;
const DOG_H = SPRITE_ROWS * PX;
const FLOOR = 8; // px from the bottom of the window to the paws
const MOUTH_DX = 19; // px from the dog's center to its mouth
const WALK_SPEED = 70;
const FETCH_SPEED = 140;
const RUN_SPEED = 240;
const GRAVITY = 1800;
const HOP_MS = 350;

const BASKET_LEFT = 116;
const BASKET_W = BASKET_FRONT[0].length * PX;
const BASKET_FRONT_H = BASKET_FRONT.length * PX;
const BASKET_RIM = BASKET_FRONT_H - 4; // top of the front rim, px above the floor

const HOUSE_RIGHT = 16; // px from the right of the window
const HOUSE_W = HOUSE[0].length * PX;
const HOUSE_DOOR = (HOUSE_PEEK.col + 7) * PX; // px from the house's left to the doorway's center

const KINDS: Record<
  ToyKind,
  { label: string; play: "fetch" | "chew"; friction: number; bounce: number; gravity: number }
> = {
  ball: { label: "tennis ball", play: "fetch", friction: 1.2, bounce: 0.55, gravity: 1 },
  frisbee: { label: "frisbee", play: "fetch", friction: 6, bounce: 0.2, gravity: 0.4 },
  bone: { label: "bone", play: "chew", friction: 6, bounce: 0.3, gravity: 1 },
  rope: { label: "rope toy", play: "chew", friction: 6, bounce: 0.25, gravity: 1 },
};

// slot: column of the basket the toy rests over; floor: starts out of the basket.
const TOY_LIST: { id: string; kind: ToyKind; slot: number; floor?: boolean }[] = [
  { id: "ball", kind: "ball", slot: 5 },
  { id: "frisbee", kind: "frisbee", slot: 11 },
  { id: "bone", kind: "bone", slot: 17 },
  { id: "rope", kind: "rope", slot: 22 },
  { id: "floorBall", kind: "ball", slot: 8, floor: true },
];

type ToyId = string;
type ToyState = "basket" | "held" | "air" | "floor" | "mouth";
type Mode = "idle" | "wander" | "nap" | "wag" | "happy" | "chase" | "fetch" | "chew" | "home" | "house";

interface Toy {
  id: ToyId;
  kind: ToyKind;
  art: string[];
  state: ToyState;
  x: number; // center, px from the left of the window
  h: number; // bottom edge, px above the floor
  vx: number;
  vy: number;
  slot: { x: number; h: number }; // resting place in the basket
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// One <rect> per horizontal run of same-colored pixels.
const PixelArt = memo(function PixelArt({ rows, flip }: { rows: string[]; flip?: boolean }) {
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      const fill = PALETTE[row[x]];
      if (fill) {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={fill} />);
      }
      x = end;
    }
  });

  return (
    <svg
      width={rows[0].length * PX}
      height={rows.length * PX}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      className="block"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {rects}
    </svg>
  );
});

function Snores() {
  return [0, 1].map((i) => (
    <motion.span
      key={i}
      className="absolute"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], x: 10, y: -16 }}
      transition={{ duration: 2, repeat: Infinity, delay: i, ease: "easeOut" }}
    >
      z
    </motion.span>
  ));
}

function makeToys(): Record<ToyId, Toy> {
  return Object.fromEntries(
    TOY_LIST.map(({ id, kind, slot: col, floor }) => {
      // Partly sunk below the front rim so it reads as inside the basket.
      const h = BASKET_RIM - Math.round(TOY_ART[kind].length * PX * 0.4);
      const slot = { x: BASKET_LEFT + col * PX, h };
      const toy: Toy = { id, kind, art: TOY_ART[kind], state: "basket", ...slot, vx: 0, vy: 0, slot };
      if (floor) Object.assign(toy, { state: "floor", x: BASKET_LEFT + BASKET_W + 60, h: 0 });
      return [id, toy];
    })
  );
}

// Whether a point is over the basket (with some slack), for dropping toys in.
function overBasket(x: number, y: number) {
  const left = BASKET_LEFT - 16;
  const right = BASKET_LEFT + BASKET_W + 16;
  const top = window.innerHeight - FLOOR - BASKET_RIM - BASKET_BACK.length * PX - 30;
  return x > left && x < right && y > top;
}

export default function Puppy() {
  const isMobile = useMobileDetection();
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [look, setLook] = useState<Look & { flip: boolean; inside: boolean; napping: boolean }>({
    pose: "sit",
    eyes: "open",
    step: 0,
    wag: false,
    carrying: null,
    flip: false,
    inside: false,
    napping: false,
  });
  const [hearts, setHearts] = useState<{ id: number; dx: number }[]>([]);
  const [basketHot, setBasketHot] = useState(false);

  const rows = useMemo(() => dogSprite(look), [look]);
  const rowsRef = useRef(rows);
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const { inside, napping, eyes } = look;
  const houseRows = useMemo(
    () => houseSprite(inside ? { eyes, mouthOpen: !napping } : null),
    [inside, napping, eyes]
  );

  const dogEl = useRef<HTMLDivElement>(null);
  const spriteEl = useRef<HTMLDivElement>(null);
  const houseEl = useRef<HTMLDivElement>(null);
  const toyEls = useRef<Partial<Record<ToyId, HTMLDivElement | null>>>({});
  const toys = useRef(makeToys());
  const grab = useRef<{
    id: ToyId;
    fromBasket: boolean;
    startX: number;
    startY: number;
    samples: { x: number; y: number; t: number }[];
  } | null>(null);
  const throwToy = useRef<(id: ToyId, returnX: number) => void>(() => {});

  useEffect(() => {
    if (isMobile) return;
    setMounted(true);

    const houseLeft = () => window.innerWidth - HOUSE_RIGHT - HOUSE_W;
    const doorX = () => houseLeft() + HOUSE_DOOR;

    const dog = {
      x: houseLeft() - DOG_W / 2,
      speed: 0,
      facing: -1 as 1 | -1,
      mode: "idle" as Mode,
      until: performance.now() + 3000,
      targetX: 0,
      target: null as ToyId | null,
      returnX: 0,
      carrying: null as ToyId | null,
      inside: false,
      homeSpeed: WALK_SPEED,
      sleepAt: 0, // while in the house, when the dog dozes off
      hopAt: -Infinity,
      blinkUntil: 0,
      nextBlink: 0,
    };

    const minX = () => DOG_W / 2;
    const maxX = () => window.innerWidth - DOG_W / 2;
    const mouthX = () => dog.x + dog.facing * MOUTH_DX;

    const setMode = (mode: Mode, ms = 0) => {
      dog.mode = mode;
      dog.until = performance.now() + ms;
    };

    const idle = () => setMode("idle", rand(2500, 6000));

    const drop = () => {
      const id = dog.carrying;
      if (!id) return;
      Object.assign(toys.current[id], { state: "floor", x: mouthX(), h: 0, vx: 0, vy: 0 });
      dog.carrying = null;
    };

    const goHome = (speed: number) => {
      dog.homeSpeed = speed;
      setMode("home");
    };

    const enterHouse = (now: number) => {
      drop();
      dog.inside = true;
      dog.sleepAt = now + rand(1500, 3000);
      setMode("house", rand(10000, 20000));
    };

    const leaveHouse = () => {
      dog.inside = false;
      dog.x = doorX();
      dog.facing = -1;
      dog.hopAt = reduceMotion ? -Infinity : performance.now();
      setMode("happy", 1500);
    };

    const decide = () => {
      if (reduceMotion) return idle();
      const r = Math.random();
      if (r < 0.5) {
        dog.targetX = clamp(dog.x + rand(-400, 400), minX(), maxX());
        setMode("wander");
      } else if (r < 0.65) {
        setMode("nap", rand(6000, 12000));
      } else if (r < 0.8) {
        goHome(WALK_SPEED);
      } else {
        setMode("wag", 2000);
      }
    };

    // A click pets with a hop; rubbing the mouse back and forth pets gently.
    const pet = (hop: boolean) => {
      const now = performance.now();
      if (hop && !reduceMotion) dog.hopAt = now;
      const offsets = hop ? [-14, 0, 14] : [rand(-12, 12)];
      setHearts((h) => [
        ...h,
        ...offsets.map((dx, i) => ({ id: now + i, dx: dx + rand(-4, 4) })),
      ]);
      window.setTimeout(() => setHearts((h) => h.filter((heart) => heart.id > now + 2)), 1200);
      if (["idle", "wander", "nap", "wag", "happy"].includes(dog.mode)) setMode("happy", 1500);
    };

    throwToy.current = (id, returnX) => {
      if (dog.inside) leaveHouse();
      drop();
      dog.target = id;
      dog.returnX = clamp(returnX, minX(), maxX());
      setMode("chase");
    };

    // Move toward a point; returns true on arrival.
    const moveTo = (x: number, speed: number, dt: number) => {
      const dx = x - dog.x;
      if (Math.abs(dx) < 2) {
        dog.speed = 0;
        return true;
      }
      dog.speed = speed;
      dog.x += Math.sign(dx) * Math.min(Math.abs(dx), speed * dt);
      return false;
    };

    const stepToys = (dt: number) => {
      const w = window.innerWidth;
      for (const toy of Object.values(toys.current)) {
        if (toy.state !== "air" && toy.state !== "floor") continue;
        const half = (toy.art[0].length * PX) / 2;
        const kind = KINDS[toy.kind];
        if (toy.state === "air") {
          toy.vy -= GRAVITY * kind.gravity * dt;
          toy.h += toy.vy * dt;
          // Falling into the basket's opening puts the toy away.
          const inOpening =
            toy.x > BASKET_LEFT + 3 * PX && toy.x < BASKET_LEFT + BASKET_W - 3 * PX;
          if (inOpening && toy.vy < 0 && toy.h < BASKET_RIM + 4 && toy.h > BASKET_RIM - 10) {
            toy.state = "basket";
            continue;
          }
          if (toy.h <= 0) {
            toy.h = 0;
            if (toy.vy < -200) {
              toy.vy *= -kind.bounce;
              toy.vx *= kind.bounce + 0.3;
            } else {
              toy.vy = 0;
              toy.state = "floor";
            }
          }
        } else {
          toy.vx *= Math.exp(-kind.friction * dt);
          if (Math.abs(toy.vx) < 5) toy.vx = 0;
        }
        toy.x += toy.vx * dt;
        if (toy.x < half || toy.x > w - half) {
          toy.x = clamp(toy.x, half, w - half);
          toy.vx *= -0.6;
        }
      }
    };

    const stepDog = (dt: number, now: number) => {
      dog.speed = 0;
      switch (dog.mode) {
        case "idle":
          if (now > dog.until) decide();
          break;
        case "nap":
        case "wag":
        case "happy":
          if (now > dog.until) idle();
          break;
        case "wander": {
          dog.facing = dog.targetX > dog.x ? 1 : -1;
          if (moveTo(dog.targetX, WALK_SPEED, dt)) idle();
          for (const toy of Object.values(toys.current)) {
            if (toy.kind !== "ball" || toy.state !== "floor") continue;
            if (Math.abs(mouthX() - toy.x) < 8 && Math.abs(toy.vx) < 30) {
              toy.vx = dog.facing * 200; // nudge it along
            }
          }
          break;
        }
        case "chase": {
          const toy = dog.target && toys.current[dog.target];
          if (!toy || (toy.state !== "air" && toy.state !== "floor")) {
            idle();
            break;
          }
          if (Math.abs(toy.x - dog.x) > 4) dog.facing = toy.x > dog.x ? 1 : -1;
          moveTo(clamp(toy.x - dog.facing * MOUTH_DX, minX(), maxX()), RUN_SPEED, dt);
          if (Math.abs(mouthX() - toy.x) < 12 && toy.h < 10) {
            toy.state = "mouth";
            dog.carrying = toy.id;
            if (KINDS[toy.kind].play === "fetch") setMode("fetch");
            else setMode("chew", rand(6000, 9000));
          }
          break;
        }
        case "fetch":
          dog.facing = dog.returnX > dog.x ? 1 : -1;
          if (moveTo(dog.returnX, FETCH_SPEED, dt)) {
            drop();
            dog.hopAt = reduceMotion ? -Infinity : now;
            setMode("happy", 1500);
          }
          break;
        case "chew":
          if (now > dog.until) {
            drop();
            idle();
          }
          break;
        case "home":
          dog.facing = doorX() > dog.x ? 1 : -1;
          if (moveTo(doorX(), dog.homeSpeed, dt)) enterHouse(now);
          break;
        case "house":
          if (now > dog.until) leaveHouse();
          break;
      }
    };

    let frame = 0;
    let last = performance.now();
    let lastKey = "";
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      stepToys(dt);
      stepDog(dt, now);

      if (now > dog.nextBlink) {
        dog.blinkUntil = now + 150;
        dog.nextBlink = now + rand(2500, 5000);
      }

      const lying = dog.mode === "nap" || dog.mode === "chew";
      const napping = dog.mode === "nap" || (dog.inside && now > dog.sleepAt);
      const wag = ["wag", "happy", "chase", "fetch", "chew"].includes(dog.mode);
      const moving = dog.speed > 0;
      const next = {
        pose: lying ? "lie" : moving ? "walk" : "sit",
        eyes: napping || dog.mode === "happy" || now < dog.blinkUntil ? "closed" : "open",
        step: (moving || wag ? Math.floor(now / (dog.speed > 150 ? 70 : 130)) % 4 : 0) as Look["step"],
        wag,
        carrying: dog.carrying ? toys.current[dog.carrying].kind : null,
        flip: dog.facing > 0,
        inside: dog.inside,
        napping,
      } as const;
      const key = JSON.stringify(next);
      if (key !== lastKey) {
        lastKey = key;
        setLook(next);
      }

      const hop = (now - dog.hopAt) / HOP_MS;
      const lift = hop >= 0 && hop < 1 ? Math.sin(hop * Math.PI) * 10 : 0;
      if (dogEl.current) {
        dogEl.current.style.transform = `translateX(${dog.x - DOG_W / 2}px)`;
        dogEl.current.style.visibility = dog.inside ? "hidden" : "visible";
      }
      if (spriteEl.current) spriteEl.current.style.transform = `translateY(${-lift}px)`;

      for (const toy of Object.values(toys.current)) {
        const el = toyEls.current[toy.id];
        if (!el) continue;
        if (toy.state === "basket") Object.assign(toy, toy.slot);
        el.style.display = toy.state === "mouth" ? "none" : "block";
        el.style.zIndex = toy.state === "basket" ? "41" : "45";
        el.style.transform = `translate(${toy.x - (toy.art[0].length * PX) / 2}px, ${-toy.h}px)`;
      }

      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // The dog's box ignores the pointer so clicks pass through its transparent
    // corners; instead, check whether a click landed on one of its pixels.
    const onPixel = (e: MouseEvent, el: HTMLElement | null, rows: string[], flip = false) => {
      if (!el || (e.target as Element).closest?.("[data-toy]")) return false;
      const rect = el.getBoundingClientRect();
      let col = Math.floor((e.clientX - rect.left) / PX);
      const row = Math.floor((e.clientY - rect.top) / PX);
      if (flip) col = rows[0].length - 1 - col;
      const pixel = rows[row]?.[col];
      return pixel !== undefined && pixel !== ".";
    };
    const onDog = (e: MouseEvent) =>
      !dog.inside && onPixel(e, spriteEl.current, rowsRef.current, dog.facing > 0);
    const onHouse = (e: MouseEvent) => onPixel(e, houseEl.current, HOUSE);
    const onClick = (e: MouseEvent) => {
      const dogHit = onDog(e);
      if (!dogHit && !onHouse(e)) return;
      // Keep the click from reaching whatever is under the dog or its house.
      e.preventDefault();
      e.stopPropagation();
      if (dogHit) {
        pet(true);
      } else if (dog.inside) {
        // Knocking on the house brings the dog out.
        leaveHouse();
        pet(true);
      } else {
        goHome(RUN_SPEED);
      }
    };
    // Petting by rubbing: counts changes of stroke direction (side to side, up and
    // down, or in circles) while the cursor is on or around the dog.
    const rub = { x: 0, y: 0, dir: "", turns: 0, at: 0 };
    const nearDog = (e: MouseEvent, margin: number) => {
      const rect = spriteEl.current?.getBoundingClientRect();
      return (
        !!rect &&
        !dog.inside &&
        e.clientX > rect.left - margin &&
        e.clientX < rect.right + margin &&
        e.clientY > rect.top - margin &&
        e.clientY < rect.bottom + margin
      );
    };
    const onMouseMove = (e: MouseEvent) => {
      document.documentElement.classList.toggle("puppy-hover", onDog(e) || onHouse(e));
      const dx = e.clientX - rub.x;
      const dy = e.clientY - rub.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) {
        rub.x = e.clientX;
        rub.y = e.clientY;
        if (nearDog(e, 30)) {
          const now = performance.now();
          if (now - rub.at > 500) rub.turns = 0;
          rub.at = now;
          const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
          if (dir !== rub.dir) {
            rub.dir = dir;
            rub.turns++;
          }
          if (rub.turns >= 3) {
            rub.turns = 0;
            pet(false);
          }
        }
      }
      if (dog.mode !== "idle") return;
      if (Math.abs(e.clientX - dog.x) > 24) dog.facing = e.clientX > dog.x ? 1 : -1;
    };
    const onResize = () => {
      dog.x = clamp(dog.x, minX(), maxX());
      if (dog.mode === "wander") dog.targetX = clamp(dog.targetX, minX(), maxX());
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("puppy-hover");
    };
  }, [isMobile, reduceMotion]);

  const toyPosition = (e: PointerEvent, toy: Toy) => {
    toy.x = e.clientX;
    toy.h = window.innerHeight - FLOOR - e.clientY - (toy.art.length * PX) / 2;
  };

  const onToyDown = (id: ToyId) => (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const toy = toys.current[id];
    grab.current = {
      id,
      fromBasket: toy.state === "basket",
      startX: e.clientX,
      startY: e.clientY,
      samples: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }],
    };
    toy.state = "held";
    toy.vx = toy.vy = 0;
  };

  const onToyMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = grab.current;
    if (!g) return;
    const moved = Math.hypot(e.clientX - g.startX, e.clientY - g.startY) > 5;
    if (moved || !g.fromBasket) toyPosition(e, toys.current[g.id]);
    setBasketHot(moved && overBasket(e.clientX, e.clientY));
    g.samples = [...g.samples, { x: e.clientX, y: e.clientY, t: e.timeStamp }].filter(
      (s) => e.timeStamp - s.t < 80
    );
  };

  const onToyUp = (e: PointerEvent<HTMLDivElement>) => {
    const g = grab.current;
    if (!g) return;
    grab.current = null;
    setBasketHot(false);
    const toy = toys.current[g.id];

    // A click on a toy in the basket tosses it out.
    if (g.fromBasket && Math.hypot(e.clientX - g.startX, e.clientY - g.startY) <= 5) {
      Object.assign(toy, { state: "air", vx: rand(220, 320), vy: rand(450, 550) });
      throwToy.current(g.id, toy.x + 180);
      return;
    }

    if (overBasket(e.clientX, e.clientY)) {
      toy.state = "basket";
      return;
    }

    const first = g.samples[0];
    const dt = Math.max((e.timeStamp - first.t) / 1000, 0.016);
    toy.vx = clamp((e.clientX - first.x) / dt, -1500, 1500);
    toy.vy = clamp(-(e.clientY - first.y) / dt, -1500, 1500);
    toy.state = "air";
    throwToy.current(g.id, e.clientX);
  };

  if (!mounted || isMobile) return null;

  return (
    <>
      {/* In front of the page content, behind the basket and toys. */}
      <div
        ref={dogEl}
        className="left-0 fixed pointer-events-none"
        style={{ bottom: FLOOR, zIndex: 39, width: DOG_W, height: DOG_H }}
      >
        <div ref={spriteEl} className="relative">
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.span
                key={heart.id}
                initial={{ opacity: 1, x: heart.dx, y: 0 }}
                animate={{ opacity: 0, y: reduceMotion ? 0 : -40 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="top-2 absolute text-pink-400 text-sm"
                style={{ left: DOG_W / 2 + (look.flip ? MOUTH_DX : -MOUTH_DX) }}
              >
                ♥
              </motion.span>
            ))}
          </AnimatePresence>

          {napping && !inside && !reduceMotion && (
            <div
              className="top-4 absolute font-mono text-muted-foreground text-xs"
              style={{ left: DOG_W / 2 + (look.flip ? MOUTH_DX : -MOUTH_DX) }}
            >
              <Snores />
            </div>
          )}

          <PixelArt rows={rows} flip={look.flip} />
        </div>
      </div>

      {/* Just behind the dog, so it walks in front of the house. */}
      <div
        ref={houseEl}
        aria-hidden="true"
        className="fixed pointer-events-none"
        style={{ right: HOUSE_RIGHT, bottom: FLOOR, zIndex: 38 }}
      >
        {inside && napping && !reduceMotion && (
          <div
            className="absolute font-mono text-[#5c3a24] text-xs"
            style={{ left: HOUSE_DOOR + 6 * PX, top: (HOUSE_PEEK.row - 2) * PX }}
          >
            <Snores />
          </div>
        )}
        <PixelArt rows={houseRows} />
      </div>

      {/* Back and front are separate layers so toys in the basket sit between them.
          Both brighten while a dragged toy is over the basket. */}
      {[
        { rows: BASKET_BACK, bottom: FLOOR - 4 + BASKET_FRONT_H, zIndex: 40 },
        { rows: BASKET_FRONT, bottom: FLOOR - 4, zIndex: 42 },
      ].map(({ rows, bottom, zIndex }) => (
        <div
          key={zIndex}
          aria-hidden="true"
          className="fixed transition-[filter] duration-150 pointer-events-none"
          style={{
            left: BASKET_LEFT,
            bottom,
            zIndex,
            filter: basketHot ? "brightness(1.3) drop-shadow(0 0 6px rgba(253, 240, 204, 0.6))" : undefined,
          }}
        >
          <PixelArt rows={rows} />
        </div>
      ))}

      {(Object.values(toys.current) as Toy[]).map((toy) => (
        <div
          key={toy.id}
          data-toy
          role="button"
          aria-label={`Toss the ${KINDS[toy.kind].label}`}
          ref={(el) => {
            toyEls.current[toy.id] = el;
          }}
          onPointerDown={onToyDown(toy.id)}
          onPointerMove={onToyMove}
          onPointerUp={onToyUp}
          onPointerCancel={onToyUp}
          className="left-0 fixed cursor-grab active:cursor-grabbing touch-none"
          style={{ bottom: FLOOR }}
        >
          <PixelArt rows={toy.art} />
        </div>
      ))}
    </>
  );
}
