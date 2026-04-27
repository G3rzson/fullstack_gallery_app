import EmptyList from "./EmptyList";
import ServerError from "./ServerError";
import PageLoader from "./PageLoader";
import useGetAllPublicGaleryTitle from "../hooks/useGetAllPublicGaleryTitle";
import { Link } from "react-router-dom";

export default function PublicGalleryTitles({ search }: { search: string }) {
  const { data, isLoading, isError, error } =
    useGetAllPublicGaleryTitle(search);

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0)
    return <EmptyList message={"Nincs galéria!"} />;

  return (
    <ul className="gallery-titles-container">
      {data.map((galleryTitle) => (
        <li key={galleryTitle._id} className="gallery-titles">
          <Link
            to={`/public-gallery-titles/${galleryTitle._id}?title=${galleryTitle.galeryTitle}`}
          >
            <h3>{galleryTitle.galeryTitle}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
