import { Moon, Sun } from "lucide-react";
import { useTheme } from "./hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <button
      title={`${isLight ? "Váltás sötét módra" : "Váltás világos módra"}`}
      className="theme-switcher-btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div key={theme} className="appear">
        {isLight ? <Moon /> : <Sun />}
      </div>
    </button>
  );
}
