import { useSearchParams } from "react-router-dom";
import PublicGalleryTitles from "../components/PublicGalleryTitles";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function PublicGalleryTitlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    setSearchParams(debouncedSearch ? { search: debouncedSearch } : {});
  }, [debouncedSearch, setSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <h1 className="page-title">Galériák</h1>

      <div className="field-group mt-4">
        <input
          type="text"
          placeholder=" "
          value={searchInput}
          onChange={handleSearch}
          className="field-input"
        />
        <label className="field-label">Keresés galéria címre...</label>
      </div>

      <PublicGalleryTitles search={debouncedSearch} />
    </>
  );
}
