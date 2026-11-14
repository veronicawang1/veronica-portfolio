"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedText } from "../navbar";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Takes the bar's place in the page flow so nothing below shifts. */}
      <div aria-hidden="true" className="h-[1.2rem] sm:h-[1.7rem]" />

      {/* On wide screens the section index at the side follows the page, so the bar stays at the
          top of the page. On narrower screens, which have no side index, it is fixed to the top
          of the window and gains a background once the page scrolls under it. */}
      <header
        className={`fixed xl:absolute inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/75 backdrop-blur-md border-b border-white/5 py-3 xl:bg-transparent xl:backdrop-blur-none xl:border-transparent xl:pt-12 xl:pb-3"
            : "pt-6 sm:pt-12 pb-3 border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center mx-auto px-4 w-full lg:w-2/3 xl:w-1/2">
          <Link href="/" className="font-pixel text-[#fff3cc] text-lg leading-none max-[420px]:hidden">
            veronica
            <span aria-hidden="true" className="text-[#c9b8ff] blink">
              _
            </span>
          </Link>
          <nav className="flex items-center gap-2 max-[420px]:mx-auto">
            <ul className="flex items-center gap-2 sm:gap-0">
              {["education", "experience", "projects", "art"].map((link, index) => (
                <li key={index}>
                  <AnimatedText href={`/#${link}`}>{link}</AnimatedText>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
