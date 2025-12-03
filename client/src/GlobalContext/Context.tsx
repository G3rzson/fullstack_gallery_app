import { createContext } from "react";
import type { ContextType } from "./ContextProvider";

export const GlobalContext = createContext<ContextType | undefined>(undefined);
