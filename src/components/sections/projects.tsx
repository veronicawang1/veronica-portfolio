import { ArrowUpRight, FileText, Presentation } from "lucide-react";
import type { ProjectTag } from "@/app/data";

interface IProjectData {
  LIVE_PREVIEW?: string;
  GITHUB?: string;
  PAPER?: string;
  POSTER?: string;
  DESCRIPTION: string[];
  NOTE?: string;
  TECH_STACK: string[];
  HIGHLIGHTS?: string[];
  VENUE?: string;
  COLLABORATORS?: string[];
  TAGS?: ProjectTag[];
}

const TAG_LABELS: Record<ProjectTag, string> = {
  research: "research",
  ml: "ml",
  fullstack: "full-stack",
  systems: "systems",
};

export function Projects({
  data,
  all,
}: {
  data: Record<string, IProjectData>;
  all: string;
}) {
  const visible = Object.entries(data).filter(([, v]) => {
    const d = v as IProjectData & { HIDDEN?: boolean };
    return !d.HIDDEN;
  });

  return (
    <div id="projects" className="py-10">
      <h2 className="font-medium text-primary/90 text-base">projects.</h2>

      <ul className="flex flex-col gap-12 mt-4 font-normal text-primary/90 text-base">
        {visible.map(([key, value]) => (
          <li key={key} className="cursor-target">
            <div className="pl-4 border-muted-foreground hover:border-primary border-l size-full transition-all duration-300">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    {value.TAGS?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary/60 font-medium"
                      >
                        {TAG_LABELS[tag]}
                      </span>
                    ))}
                  </div>

                  <p className="text-primary/90 text-lg leading-snug">{key}</p>

                  {value.VENUE && (
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{value.VENUE}</p>
                  )}

                  {value.COLLABORATORS && value.COLLABORATORS.length > 0 && (
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      w/ {value.COLLABORATORS.join(", ")}
                    </p>
                  )}

                  <p className="flex items-center gap-3 text-sm mt-1">
                    {value.LIVE_PREVIEW && (
                      <a
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        href={value.LIVE_PREVIEW}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        live preview <ArrowUpRight size={14} />
                      </a>
                    )}
                    {value.PAPER && (
                      <a
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        href={value.PAPER}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        paper <FileText size={14} />
                      </a>
                    )}
                    {value.POSTER && (
                      <a
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        href={value.POSTER}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        poster <Presentation size={14} />
                      </a>
                    )}
                    {value.GITHUB && (
                      <a
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        href={value.GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github <ArrowUpRight size={14} />
                      </a>
                    )}
                  </p>
                </div>

                {value.HIGHLIGHTS && value.HIGHLIGHTS.length > 0 && (
                  <ul className="flex flex-col gap-1 shrink-0 text-right">
                    {value.HIGHLIGHTS.map((h, i) => (
                      <li
                        key={i}
                        className="text-xs font-medium text-primary/80 bg-primary/5 border border-primary/10 px-2 py-1 rounded whitespace-nowrap"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ul className="space-y-1 mt-2 pl-3 text-muted-foreground text-sm text-justify list-disc">
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
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center bg-background hover:bg-accent disabled:opacity-50 shadow-sm px-4 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 font-medium text-muted-foreground text-sm whitespace-nowrap transition-colors hover:text-accent-foreground cursor-target disabled:pointer-events-none"
          href={all}
        >
          View all projects
        </a>
      </div>
    </div>
  );
}
