"use client";

import { AnimatedText } from "../navbar";

export function Navbar() {
  return (
    <header className="flex justify-end items-end">
      <nav className="flex items-center gap-2">
        <ul className="flex items-center gap-2 sm:gap-0">
          {["education", "experience", "projects", "art"].map((link, index) => (
            <li key={index}>
              <AnimatedText href={`/#${link}`}>{link}</AnimatedText>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
