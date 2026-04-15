import { useEffect } from "react";

type EscapeHandler = () => void;

export function useEscapeKey(onEscape: EscapeHandler, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      onEscape();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape]);
}
