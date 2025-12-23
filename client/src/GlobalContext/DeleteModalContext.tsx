import { createContext } from "react";
import type { ModalContextType } from "./DeleteModalContextProvider";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
