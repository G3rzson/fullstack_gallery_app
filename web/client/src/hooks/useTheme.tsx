import { useEffect, useState } from "react";

type ThemeType = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Prefer localStorage, fallback to class on root
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    const hasDarkClass = document.documentElement.classList.contains("dark");
    return hasDarkClass ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
