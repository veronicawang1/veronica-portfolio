import { SectionHeading } from "@/components/ui/section-heading";

export function Skills({ data }: { data: Record<string, string[]> }) {
  return (
    <div id="skills" className="py-10">
      <SectionHeading index="05">technical skills</SectionHeading>

      <ul className="flex flex-col gap-2 mt-4 font-normal text-primary/90 text-base">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="items-baseline gap-x-4 grid sm:grid-cols-[190px_1fr]">
            <p className="font-mono text-[#c9b8ff] text-xs">{key}</p>
            <p className="text-muted-foreground text-sm">{value.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
