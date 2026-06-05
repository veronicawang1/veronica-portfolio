"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedText, MovingElement } from "../navbar";

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      resolvedTheme === "dark"
        ? "light"
        : resolvedTheme === "light"
          ? "dark"
          : "system";
    setTheme(nextTheme);
  };

  return (
    <header className="flex justify-end items-end">
      <nav className="flex items-center gap-2">
        <ul className="flex items-center gap-2 sm:gap-0">
          {["experience", "projects", "art"].map((link, index) => (
            <li key={index}>
              <AnimatedText href={`/#${link}`}>{link}</AnimatedText>
            </li>
          ))}
        </ul>

        {isMounted && (
          <MovingElement
            className="p-[10px] rounded-full"
            change={toggleTheme}
            ariaLabel={`Switch to ${
              resolvedTheme === "dark" ? "light" : "dark"
            } mode`}
          >
            {resolvedTheme === "dark" ? <Moon /> : <Sun />}
          </MovingElement>
        )}
      </nav>
    </header>
  );
}
