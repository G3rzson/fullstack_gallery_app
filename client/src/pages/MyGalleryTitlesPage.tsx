import { Link } from "react-router-dom";
import MyGalleryTitles from "../components/MyGalleryTitles";

export default function MyGalleryTitlesPage() {
  return (
    <>
      <h1 className="page-title">Saját galériák</h1>

      <Link
        to="/my-gallery-titles/create"
        className="block text-center px-4 mt-6 py-2 rounded-lg bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-700 transition-colors duration-300"
      >
        Új galéria létrehozása
      </Link>

      <MyGalleryTitles />
    </>
  );
}
