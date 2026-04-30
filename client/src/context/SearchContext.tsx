import { createContext } from "react";
import type { SearchContextType } from "./SearchbarContextProvider";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);
