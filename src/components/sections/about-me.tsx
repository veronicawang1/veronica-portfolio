import { SectionHeading } from "@/components/ui/section-heading";

export function AboutMe({ data }: { data: Record<string, string> }) {
  return (
    <div id="aboutme" className="py-10">
      <SectionHeading index="01">about me</SectionHeading>

      <p className="flex flex-col gap-2 mt-4 font-normal text-muted-foreground text-base text-justify">
        <span>{data.INTRO}</span>

        {/* <span>{data.BLOG}</span> */}
      </p>
    </div>
  );
}
