"use client";

import { useEffect, useRef } from "react";

// Darkest to brightest.
const RAMP = " .·:-=+*#%@";
const CELL_W = 11;
const CELL_H = 18;
const FPS = 12;

// A slow drifting glow drawn in text characters, filling its parent.
// With `fade` the glow thins out toward the bottom; without it the field is even all the way down.
export default function AsciiVeil({ color = "150, 110, 255", fade = true }: { color?: string; fade?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // One pass per brightness level keeps the number of style changes small.
      const levels: number[][] = RAMP.split("").map(() => []);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c / cols;
          const y = r / rows;
          // Two broad diagonal bands that drift, plus finer ripples.
          const band = Math.sin((x * 1.6 - y * 1.1) * Math.PI + t * 0.22) * 0.5 + 0.5;
          const band2 = Math.sin((x * 0.9 + y * 1.7) * Math.PI - t * 0.15 + 1.3) * 0.5 + 0.5;
          const ripple = Math.sin(c * 0.31 + t * 0.9) * Math.sin(r * 0.47 - t * 0.6) * 0.5 + 0.5;
          let v = band * band * 0.75 + band2 * band2 * 0.3 + ripple * 0.18 - 0.22;
          if (fade) v *= 1 - y * y;
          const level = Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)));
          if (level > 0) levels[level].push(c, r);
        }
      }
      for (let l = 1; l < levels.length; l++) {
        const cells = levels[l];
        if (cells.length === 0) continue;
        ctx.fillStyle = `rgba(${color}, ${(0.12 + (l / (RAMP.length - 1)) * 0.5).toFixed(2)})`;
        for (let i = 0; i < cells.length; i += 2) {
          ctx.fillText(RAMP[l], cells[i] * CELL_W, cells[i + 1] * CELL_H);
        }
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || time - last < 1000 / FPS) return;
      last = time;
      draw(time);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil(height / CELL_H);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `13px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      draw(performance.now());
    };

    const sizes = new ResizeObserver(resize);
    sizes.observe(parent);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    seen.observe(canvas);
    if (!still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      sizes.disconnect();
      seen.disconnect();
    };
  }, [color, fade]);

  return <canvas ref={canvasRef} aria-hidden="true" className="block size-full" />;
}
