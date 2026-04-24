import { createContext } from "react";
import type { UserContextType } from "./UserContextProvider";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
