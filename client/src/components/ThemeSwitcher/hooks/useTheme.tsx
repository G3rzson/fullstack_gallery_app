import { useEffect, useState } from "react";

type ThemeType = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const domTheme = document.documentElement.getAttribute("data-theme");

    if (domTheme === "light" || domTheme === "dark") {
      return domTheme;
    }

    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
