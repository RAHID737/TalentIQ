"use client";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>(() =>
    typeof window === "undefined" ? "light" : localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <button
        aria-label="Toggle theme"
        className="fixed bottom-4 right-4 rounded-full p-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        {theme === "dark" ? "☀" : "🌙"}
      </button>
      {children}
    </div>
  );
}

