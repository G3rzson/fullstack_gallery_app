import { Link } from "react-router-dom";
import useMyGaleryTitleGet from "../hooks/useMyGaleryTitleGet";
import EmptyList from "./EmptyList";
import PageLoader from "./PageLoader";
import ServerError from "./ServerError";
import MyGalleryTitleActionMenu from "./MyGalleryTitleActionMenu";

export default function MyGalleryTitles({ search }: { search: string }) {
  const { data, isLoading, isError, error } = useMyGaleryTitleGet(search);

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0)
    return <EmptyList message={"Még nincs galériád. Hozz létre egyet!"} />;

  return (
    <ul className="gallery-titles-container">
      {data.map((galleryTitle) => (
        <li key={galleryTitle._id} className="gallery-titles group">
          <Link
            to={`/my-gallery-titles/${galleryTitle._id}?title=${galleryTitle.galeryTitle}`}
          >
            <h3>{galleryTitle.galeryTitle}</h3>
            <p>{galleryTitle.isPublic ? "Publikus" : "Privát"}</p>
          </Link>

          <MyGalleryTitleActionMenu
            galleryTitleId={galleryTitle._id}
            isPublic={galleryTitle.isPublic}
          />
        </li>
      ))}
    </ul>
  );
}
