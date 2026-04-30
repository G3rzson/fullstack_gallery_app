import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchbarContextProvider",
    );
  }
  return context;
}
