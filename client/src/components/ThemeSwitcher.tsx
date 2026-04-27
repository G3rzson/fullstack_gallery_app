import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <button
      className="absolute top-2 right-2 cursor-pointer hover:bg-fuchsia-400/20 p-2 rounded transition-colors duration-300"
      title={`${isLight ? "Váltás sötét módra" : "Váltás világos módra"}`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <div key={theme}>{isLight ? <Moon /> : <Sun />}</div>
    </button>
  );
}
