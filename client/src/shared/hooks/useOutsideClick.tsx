import { type RefObject, useEffect } from "react";

type OutsideClickHandler = () => void;

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: OutsideClickHandler,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;

      if (!ref.current || !target || ref.current.contains(target)) {
        return;
      }

      onOutsideClick();
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [enabled, onOutsideClick, ref]);
}
