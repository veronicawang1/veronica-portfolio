"use client";

import { extractDomain } from "@/lib/utils";
import { ArrowUpRight, FileText, Quote } from "lucide-react";
import { useState } from "react";

interface IExperienceData {
  WEBSITE?: string;
  PAPER?: string;
  CITATION?: string;
  POSITION: string;
  LOCATION: string;
  DURATION: string;
  DESCRIPTION: string[];
  TECH_STACK: string[];
  COLLABORATORS?: string[];
}

function CitationTab({ citation }: { citation: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 pl-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-primary transition-colors cursor-target"
      >
        <Quote size={12} /> cite
      </button>
      {open && (
        <p className="mt-2 text-xs text-muted-foreground/80 bg-primary/5 border border-primary/10 rounded px-3 py-2 leading-relaxed">
          {citation}
        </p>
      )}
    </div>
  );
}

export function Experience({
  data,
}: {
  data: Record<string, IExperienceData>;
}) {
  return (
    <div id="experience" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">experience.</h2>

      <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300">
              <div className="flex sm:flex-row flex-col justify-between items-start">
                <div>
                  <p className="text-primary/90 text-lg">
                    {value.POSITION}{" "}
                    <span className="inline-block bg-secondary max-sm:mb-2 ml-2 px-2 py-1 rounded text-xs">
                      {value.LOCATION}
                    </span>
                  </p>
                  <p className="flex items-center gap-3 text-sm">
                    {value.WEBSITE && (
                      <span className="flex items-center">
                        at,{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 ml-1"
                          href={value.WEBSITE}
                        >
                          {extractDomain(value.WEBSITE)} <ArrowUpRight size={18} />
                        </a>
                      </span>
                    )}
                    {value.PAPER && (
                      <a
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        href={value.PAPER}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        publication <FileText size={14} />
                      </a>
                    )}
                  </p>
                  {value.COLLABORATORS && value.COLLABORATORS.length > 0 && (
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      w/ {value.COLLABORATORS.join(", ")}
                    </p>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {value.DURATION}
                </p>
              </div>

              <ul className="space-y-1 mt-1 pl-3 text-muted-foreground text-sm text-justify list-disc">
                {value.DESCRIPTION.map((desc, index) => (
                  <li key={index}>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap items-center gap-2 mt-2 pl-3">
                {value.TECH_STACK.map((tech, index) => (
                  <li
                    key={index}
                    className="bg-muted px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {value.CITATION && <CitationTab citation={value.CITATION} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
