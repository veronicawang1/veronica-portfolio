"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IArtPiece {
  title: string;
  medium: string;
  year: string;
  category?: string;
  award?: string;
  image: string;
}

interface IFeaturedArticle {
  publication: string;
  title: string;
  description: string;
  year: string;
  url: string;
}

interface IArtData {
  PIECES: IArtPiece[];
  FEATURED: IFeaturedArticle[];
}

// Full-screen viewer for one piece; the page stays visible, dimmed, behind it.
function Lightbox({
  pieces,
  index,
  onClose,
  onNavigate,
}: {
  pieces: IArtPiece[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const piece = pieces[index];
  const go = (delta: number) => onNavigate((index + delta + pieces.length) % pieces.length);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      className="z-[200] fixed inset-0 flex flex-col justify-center items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* In the window corner, clear of the image (the image always leaves room above it). */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="top-4 right-4 absolute flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-full size-10 text-white transition-colors"
      >
        <X size={20} />
      </button>

      <motion.div
        key={piece.image}
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={piece.image}
          alt={piece.title}
          width={1600}
          height={1200}
          unoptimized
          className="shadow-2xl rounded"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "min(92vw, 1400px)",
            maxHeight: "calc(100svh - 170px)",
          }}
        />

        <div className="flex items-center gap-4 mt-4 text-center">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous artwork"
            className="flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-full size-8 text-white transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-0">
            <p className="font-medium text-primary text-sm">{piece.title}</p>
            <p className="text-muted-foreground text-xs">
              {piece.medium} · {piece.year}
            </p>
            {piece.award && <p className="mt-0.5 text-muted-foreground/80 text-xs">{piece.award}</p>}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next artwork"
            className="flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-full size-8 text-white transition-colors shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Art({ data }: { data: IArtData }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const close = () => {
    setOpen(null);
    // Return keyboard focus to the piece that was opened.
    const i = lastOpened.current;
    if (i !== null) requestAnimationFrame(() => triggers.current[i]?.focus());
  };

  return (
    <div id="art" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">art.</h2>

      <div className="mt-4 columns-2 sm:columns-3 gap-2 space-y-2">
        {data.PIECES.map((piece, i) => (
          <button
            key={i}
            type="button"
            ref={(el) => {
              triggers.current[i] = el;
            }}
            onClick={() => {
              lastOpened.current = i;
              setOpen(i);
            }}
            aria-label={`View ${piece.title} larger`}
            className="block break-inside-avoid group relative overflow-hidden rounded w-full text-left cursor-zoom-in cursor-target"
          >
            <Image
              src={piece.image}
              alt={piece.title}
              width={600}
              height={400}
              style={{ width: "100%", height: "auto" }}
              className="transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-2">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-medium text-white leading-tight">
                  {piece.title}
                </p>
                <p className="text-[10px] text-white/80">
                  {piece.medium} · {piece.year}
                </p>
                {piece.award && (
                  <p className="text-[10px] text-white/70 mt-0.5">{piece.award}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <Lightbox
                pieces={data.PIECES}
                index={open}
                onClose={close}
                onNavigate={(i) => {
                  lastOpened.current = i;
                  setOpen(i);
                }}
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      <div className="mt-10">
        <h3 className="font-medium text-primary/60 text-sm mb-3 uppercase tracking-wider text-xs">
          featured in
        </h3>
        <ul className="flex flex-col gap-3">
          {data.FEATURED.map((item, i) => (
            <li key={i}>
              <div className="pl-4 border-l border-muted-foreground hover:border-primary transition-all duration-300">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  {item.publication}
                  <ExternalLink size={11} className="shrink-0" />
                </a>
                <p className="text-xs text-muted-foreground">
                  {item.title} · {item.description} · {item.year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
