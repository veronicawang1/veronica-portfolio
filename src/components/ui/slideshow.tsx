"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export interface ISlide {
  IMAGE: StaticImageData;
  TITLE: string;
  CAPTION: string;
}

export function Slideshow({ slides, alt }: { slides: ISlide[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <div
      className="mt-3 ml-3 outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="group relative rounded overflow-hidden border border-primary/10 aspect-video bg-white">
        <Image
          key={index}
          src={slide.IMAGE}
          alt={`${alt}: ${slide.TITLE}`}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          placeholder="blur"
          className="object-contain animate-in fade-in duration-300"
        />

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="left-2 absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-full size-8 text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="right-2 absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-black/50 hover:bg-black/70 rounded-full size-8 text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center gap-3 mt-2">
        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${s.TITLE}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground/70 tabular-nums">
          {index + 1} / {slides.length}
        </span>
      </div>

      <p className="mt-2 text-sm text-primary/90" aria-live="polite">
        {slide.TITLE}
      </p>
      <p className="mt-1 text-sm text-muted-foreground text-justify">
        {slide.CAPTION}
      </p>
    </div>
  );
}
