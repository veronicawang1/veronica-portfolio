// Section title in the pixel font, with its number in front and a dashed rule running to the edge.
export function SectionHeading({ index, children }: { index: string; children: string }) {
  return (
    <h2 className="flex items-baseline gap-3 font-pixel text-[#fff3cc] text-2xl leading-none">
      <span aria-hidden="true" className="font-mono text-[#c9b8ff] text-xs">
        {index}
      </span>
      {children}
      <span aria-hidden="true" className="flex-1 border-white/20 border-t border-dashed self-center" />
    </h2>
  );
}
