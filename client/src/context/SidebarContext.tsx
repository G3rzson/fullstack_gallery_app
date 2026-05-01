import { createContext } from "react";
import type { SidebarContextType } from "./SidebarContextProvider";

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);
