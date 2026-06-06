import { ArrowUp } from "lucide-react";

export function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-6 py-10 border-gray-800 border-t">
      <div className="flex max-md:flex-col justify-between items-center max-md:gap-2 w-full">
        <p className="text-muted-foreground text-base text-center">
          &copy; {new Date().getFullYear()} Veronica Wang. All rights reserved.
        </p>
        <button
          className="flex items-center gap-2 w-fit text-muted-foreground text-base cursor-pointer"
          onClick={scrollToTop}
        >
          Elevate to the top
          <ArrowUp size={20} />
        </button>
      </div>
      <a
        href="/frog.jpg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground/40 text-xs hover:text-muted-foreground transition-colors cursor-pointer"
      >
        🎁 surprise
      </a>
    </div>
  );
}
