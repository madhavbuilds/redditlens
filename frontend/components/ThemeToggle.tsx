"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-transparent p-2 text-[var(--text-secondary)] transition hover:border-[var(--border)] hover:text-[var(--text-primary)]"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
