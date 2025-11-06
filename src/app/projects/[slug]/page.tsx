import { DATA, getProjectData } from "@/app/data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectData(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="pt-12 flex flex-col text-base font-normal text-primary/90">
      <div className="size-full border-l border-muted-foreground pl-4 transition-all duration-300 hover:border-primary">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h1 className="text-xl">{project[0]}</h1>

          <p className="flex items-center gap-2 text-sm">
            {project[1].LIVE_PREVIEW && (
              <a
                className="flex items-center gap-1"
                href={project[1].LIVE_PREVIEW}
                target="_blank"
                rel="noopener noreferrer"
              >
                live preview <ArrowUpRight size={18} />
              </a>
            )}
            {project[1].GITHUB && (
              <a
                className="flex items-center gap-1"
                href={project[1].GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                github <ArrowUpRight size={18} />
              </a>
            )}
          </p>
        </div>

        <Image src={project[1].IMAGE} alt={project[0]} className="py-4" />

        <div className="grid sm:grid-cols-3 gap-4 items-start">
          <ul className="list-disc pl-3 text-sm text-muted-foreground text-justify sm:col-span-2">
            {project[1].DESCRIPTION.map((desc, index) => (
              <li key={index}>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center justify-end gap-2 pl-3">
            {project[1].TECH_STACK.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </ul>
        </div>

        {project[1].NOTE && (
          <p className="mt-4 text-sm text-primary/60">{project[1].NOTE}</p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-sm text-muted-foreground"
          href={DATA.ALL_PROJECTS}
        >
          View all projects
        </a>
      </div>
    </section>
  );
}
