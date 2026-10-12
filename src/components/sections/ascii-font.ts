// ASCII art letters for the landing greeting, one per character so each can animate on its own.
// Only the characters the header uses are included; anything missing falls back to the plain character.
export type AsciiFont = { rows: number; glyphs: Record<string, string> };

// The figlet "Small" font, with blank columns trimmed so the letters sit close together.
export const SMALL: AsciiFont = {
  rows: 4,
  glyphs: {
    " ": "  \n  \n  \n  ",
    "h": " _    \n| |_  \n| ' \\ \n|_||_|",
    "i": " _ \n(_)\n| |\n|_|",
    "t": " _   \n| |_ \n|  _|\n \\__|",
    "e": "     \n ___ \n/ -_)\n\\___|",
    "r": "     \n _ _ \n| '_|\n|_|  ",
    "!": " _ \n| |\n|_|\n(_)",
    "'": " _ \n( )\n|/ \n   ",
    "m": "       \n _ __  \n| '  \\ \n|_|_|_|",
  },
};

// Lowercase drawn by hand in the style of figlet's "ANSI Shadow" font, which only has capitals.
export const BLOCK: AsciiFont = {
  rows: 6,
  glyphs: {
    "h": "██╗     \n██║     \n██████╗ \n██╔══██╗\n██║  ██║\n╚═╝  ╚═╝",
    "i": "██╗\n╚═╝\n██╗\n██║\n██║\n╚═╝",
    "t": " ██╗   \n██████╗\n╚██╔══╝\n ██║   \n ╚████╗\n  ╚═══╝",
    "e": " █████╗ \n██╔══██╗\n███████║\n██╔════╝\n╚██████╗\n ╚═════╝",
    "r": "██████╗ \n██╔══██╗\n██║  ╚═╝\n██║     \n██║     \n╚═╝     ",
    "!": "██╗\n██║\n██║\n╚═╝\n██╗\n╚═╝",
    "'": " ██╗\n ██║\n ╚═╝\n    \n    \n    ",
    "m": "██████████╗  \n██╔══██╔══██╗\n██║  ██║  ██║\n██║  ██║  ██║\n██║  ██║  ██║\n╚═╝  ╚═╝  ╚═╝",
    "v": "██╗  ██╗\n██║  ██║\n██║  ██║\n╚██╗██╔╝\n ╚███╔╝ \n  ╚══╝  ",
    "o": " █████╗ \n██╔══██╗\n██║  ██║\n██║  ██║\n╚█████╔╝\n ╚════╝ ",
    "n": "██████╗ \n██╔══██╗\n██║  ██║\n██║  ██║\n██║  ██║\n╚═╝  ╚═╝",
    "c": " █████╗\n██╔═══╝\n██║    \n██║    \n╚█████╗\n ╚════╝",
    "a": "██████╗ \n╚════██╗\n ██████║\n██╔══██║\n╚██████║\n ╚═════╝",
    " ": "  \n  \n  \n  \n  \n  ",
  },
};
