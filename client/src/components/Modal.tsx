import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useEscapeKey } from "../hooks/useEscapeKey";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  mode?: "default" | "loader";
};

export default function Modal({
  isOpen,
  onClose,
  children,
  mode = "default",
}: ModalProps) {
  useEscapeKey(onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen p-4 flex items-center justify-center z-100 bg-black/70"
      onClick={onClose}
    >
      <div
        className={`relative ${mode === "loader" ? "pointer-events-none" : "pointer-events-auto"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {mode !== "loader" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-0.5 bg-fuchsia-300/80 dark:bg-fuchsia-950/80 duration-300 rounded-md hover:bg-fuchsia-400 dark:hover:bg-fuchsia-900 transition-colors cursor-pointer"
            title="Modal bezárása"
          >
            <X />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
