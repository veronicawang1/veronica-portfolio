import { SectionHeading } from "@/components/ui/section-heading";

interface IEducationEntry {
  SCHOOL: string;
  DEGREE: string;
  LOCATION: string;
  DURATION: string;
}

export function Education({ data }: { data: IEducationEntry[] }) {
  return (
    <div id="education" className="py-10">
      <SectionHeading index="02">education</SectionHeading>

      <ul className="flex flex-col gap-6 mt-4 font-normal text-primary/90 text-base">
        {data.map((entry, i) => (
          <li key={i} className="cursor-target">
            <div className="pl-4 border-l border-muted-foreground hover:border-primary size-full transition-all duration-300">
              <div className="flex sm:flex-row flex-col justify-between items-start">
                <div>
                  <p className="font-mono font-medium text-[#fff3cc] text-base leading-snug">{entry.SCHOOL}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {entry.DEGREE}
                    <span className="ml-2 chip">
                      {entry.LOCATION}
                    </span>
                  </p>
                </div>
                <p className="max-sm:mt-1 font-mono text-muted-foreground text-xs">{entry.DURATION}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
