"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { topbarIconButton } from "./topbar-style";

/** Switches between light and dark (next-themes, class strategy). */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={topbarIconButton}
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
