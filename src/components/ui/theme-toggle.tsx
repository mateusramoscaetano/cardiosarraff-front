"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed right-2 top-2 z-50 p-2 border-2 border-zinc-100 dark:border-zinc-800 dark:shadow-sm shadow-sm rounded"
    >
      {theme === "dark" ? (
        <Moon className="text-zinc-600 dark:text-zinc-500" />
      ) : (
        <Sun className="text-zinc-600 dark:text-zinc-500" />
      )}
    </button>
  );
}
