"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

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

export function Art({ data }: { data: IArtData }) {
  return (
    <div id="art" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">art.</h2>

      <div className="mt-4 columns-2 sm:columns-3 gap-2 space-y-2">
        {data.PIECES.map((piece, i) => (
          <a
            key={i}
            href={piece.image}
            target="_blank"
            rel="noopener noreferrer"
            className="block break-inside-avoid group relative overflow-hidden rounded cursor-target"
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
          </a>
        ))}
      </div>

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
