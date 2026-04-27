import { createContext } from "react";
import type { ModalContextType } from "./ModalContextProvider";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
