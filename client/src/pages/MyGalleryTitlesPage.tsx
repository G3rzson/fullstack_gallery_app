import { Link, useSearchParams } from "react-router-dom";
import MyGalleryTitles from "../components/MyGalleryTitles";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function MyGalleryTitlesPage() {
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
      <h1 className="page-title">Saját galériák</h1>

      <Link
        to="/my-gallery-titles/create"
        className="block text-center px-4 mt-6 py-2 rounded-lg bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-700 transition-colors duration-300"
      >
        Új galéria létrehozása
      </Link>

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

      <MyGalleryTitles search={debouncedSearch} />
    </>
  );
}
