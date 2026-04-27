import { Link, useSearchParams } from "react-router-dom";
import MyGalleryTitles from "../components/MyGalleryTitles";
import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import PageLoader from "../components/PageLoader";
import toast from "react-hot-toast";

export default function MyGalleryTitlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 400);
  const { userObj, isAuthLoading } = useUserContext();
  const navigate = useNavigate();

  // Auth guard csak a védett oldalra
  useEffect(() => {
    if (!isAuthLoading && !userObj && window.location.pathname !== "/") {
      toast.error("Kérlek jelentkezz be a saját galériáid megtekintéséhez!");
      setTimeout(() => navigate("/user/login", { replace: true }), 0);
    }
  }, [userObj, isAuthLoading, navigate]);

  useEffect(() => {
    setSearchParams(debouncedSearch ? { search: debouncedSearch } : {});
  }, [debouncedSearch, setSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  if (isAuthLoading || !userObj) {
    return <PageLoader />;
  }

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
