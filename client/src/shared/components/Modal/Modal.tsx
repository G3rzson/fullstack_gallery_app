import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

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
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-content ${mode === "loader" ? "modal-loader" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {mode !== "loader" && (
          <button
            onClick={onClose}
            className="modal-close-btn"
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
