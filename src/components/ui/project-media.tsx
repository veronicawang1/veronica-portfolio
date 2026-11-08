"use client";

import { Pause, Play } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Slideshow, type ISlide } from "./slideshow";

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function VideoPlayer({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const dragging = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [hoverTime, setHoverTime] = useState<{ x: number; t: number } | null>(null);

  // Only download and play clips while they are on screen, unless the viewer paused it.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) el.play().catch(() => {});
        else if (!entry.isIntersecting) el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  // Keep the progress fill in sync every frame while playing (smoother than timeupdate).
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = videoRef.current;
      if (el && fillRef.current && el.duration) {
        fillRef.current.style.width = `${(el.currentTime / el.duration) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  const fractionAt = (clientX: number) => {
    const rect = barRef.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  };
  const seek = (fraction: number) => {
    const el = videoRef.current;
    if (el?.duration) el.currentTime = fraction * el.duration;
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="absolute inset-0 size-full object-cover cursor-pointer"
      />

      {/* Controls show on hover or keyboard focus; always visible on touch screens. */}
      <div className="bottom-0 absolute inset-x-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 px-2.5 pt-6 pb-2 transition-opacity duration-200">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="flex justify-center items-center bg-white/15 hover:bg-white/30 rounded-full size-7 text-white transition-colors shrink-0"
        >
          {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
        </button>

        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(((videoRef.current?.currentTime ?? 0) / (videoRef.current?.duration || 1)) * 100)}
          className="group/bar relative flex items-center py-2 cursor-pointer grow touch-none"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(fractionAt(e.clientX));
          }}
          onPointerMove={(e) => {
            const f = fractionAt(e.clientX);
            const el = videoRef.current;
            if (el?.duration) setHoverTime({ x: f * 100, t: f * el.duration });
            if (dragging.current) seek(f);
          }}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => setHoverTime(null)}
          onKeyDown={(e) => {
            const el = videoRef.current;
            if (!el?.duration) return;
            if (e.key === "ArrowRight") el.currentTime = Math.min(el.duration, el.currentTime + 1);
            if (e.key === "ArrowLeft") el.currentTime = Math.max(0, el.currentTime - 1);
            if (e.key === " " || e.key === "k") {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <div className="relative bg-white/25 rounded-full w-full h-1 group-hover/bar:h-1.5 transition-[height] duration-150">
            <div ref={fillRef} className="top-0 left-0 absolute bg-white rounded-full h-full">
              <span className="top-1/2 -right-1.5 absolute bg-white opacity-0 group-hover/bar:opacity-100 rounded-full size-3 transition-opacity -translate-y-1/2" />
            </div>
          </div>
          {hoverTime && (
            <span
              className="bottom-full absolute bg-black/75 mb-1 px-1.5 py-0.5 rounded font-mono text-[10px] text-white -translate-x-1/2 pointer-events-none"
              style={{ left: `${hoverTime.x}%` }}
            >
              {formatTime(hoverTime.t)}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export function ProjectMedia({
  video,
  image,
  slides,
  alt,
}: {
  video?: string;
  image?: StaticImageData;
  slides?: ISlide[];
  alt: string;
}) {
  if (slides && slides.length > 0) return <Slideshow slides={slides} alt={alt} />;
  if (!video && !image) return null;

  return (
    <div className="group relative mt-3 ml-3 rounded overflow-hidden border border-primary/10 aspect-video bg-[#0b0e14]">
      {video ? (
        <VideoPlayer src={video} poster={image?.src} alt={alt} />
      ) : (
        image && (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            placeholder="blur"
            className="object-cover"
          />
        )
      )}
    </div>
  );
}
