"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { Slideshow, type ISlide } from "./slideshow";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only download and play clips while they are on screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

  if (slides && slides.length > 0) return <Slideshow slides={slides} alt={alt} />;
  if (!video && !image) return null;

  return (
    <div className="relative mt-3 ml-3 rounded overflow-hidden border border-primary/10 aspect-video bg-[#0b0e14]">
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={image?.src}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 size-full object-cover"
        />
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
