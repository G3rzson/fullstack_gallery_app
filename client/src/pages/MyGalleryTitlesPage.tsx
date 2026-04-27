import { Link } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import PageLoader from "../components/PageLoader";
import ServerError from "../components/ServerError";
import useMyGaleryTitleGet from "../hooks/useMyGaleryTitleGet";
import MyGalleryTitleActionMenu from "../components/MyGalleryTitleActionMenu";

export default function MyGalleryTitlesPage() {
  const { data, isLoading, isError, error } = useMyGaleryTitleGet();

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0) return <EmptyList />;

  return (
    <>
      <h1 className="page-title">Saját galériák</h1>

      <Link
        to="/my-gallery-titles/create"
        className="block text-center px-4 mt-6 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 dark:bg-pink-800 dark:hover:bg-pink-700 transition-colors duration-300"
      >
        Új galéria létrehozása
      </Link>

      <ul className="gallery-titles-container">
        {data.map((galleryTitle) => (
          <li key={galleryTitle._id} className="gallery-titles group">
            <Link
              to={`/my-gallery-titles/${galleryTitle._id}?title=${galleryTitle.gallery}`}
            >
              <h3>{galleryTitle.gallery}</h3>
              <p>{galleryTitle.isPublic ? "Publikus" : "Privát"}</p>
            </Link>

            <MyGalleryTitleActionMenu
              galleryTitleId={galleryTitle._id}
              isPublic={galleryTitle.isPublic}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
