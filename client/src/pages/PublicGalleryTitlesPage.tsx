import { Link } from "react-router-dom";
import useGetAllPublicGaleryTitle from "../hooks/useGetAllPublicGaleryTitle";
import EmptyList from "../components/EmptyList";
import PageLoader from "../components/PageLoader";
import ServerError from "../components/ServerError";

export default function PublicGalleryTitlesPage() {
  const { data, isLoading, isError, error } = useGetAllPublicGaleryTitle();

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0) return <EmptyList />;
  return (
    <>
      <h1 className="page-title">Galériák</h1>

      <ul className="gallery-titles-container">
        {data.map((galleryTitle) => (
          <li key={galleryTitle._id} className="gallery-titles">
            <Link
              to={`/public-gallery-titles/${galleryTitle._id}?title=${galleryTitle.gallery}`}
            >
              <h3>{galleryTitle.gallery}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
