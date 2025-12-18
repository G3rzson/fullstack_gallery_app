import { createContext } from "react";
import type { ContextType } from "./GlobalContextProvider";

export const GlobalContext = createContext<ContextType | undefined>(undefined);
