"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function DetailsDropdown({
  items,
  label = "details",
}: {
  items: string[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const bullets = items.filter((item) => item.trim() !== "");

  if (bullets.length === 0) return null;

  return (
    <div className="mt-2 pl-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm text-muted-foreground/70 hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul
          className="space-y-1 pl-3 overflow-hidden text-muted-foreground text-sm text-justify list-disc"
          inert={!open}
        >
          {bullets.map((desc, index) => (
            <li key={index} className={index === 0 ? "mt-2" : undefined}>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
