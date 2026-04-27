import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  }
  return context;
}
