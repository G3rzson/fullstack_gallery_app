import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "./SearchContext";

export type SearchContextType = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  hasListItem: boolean;
  setHasListItem: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchbarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const [searchQuery, setSearchQuery] = useState(searchInput);
  const [hasListItem, setHasListItem] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => setSearchQuery(searchInput), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      return params;
    });
  }, [searchQuery, setSearchParams]);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchQuery,
        setSearchQuery,
        hasListItem,
        setHasListItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
