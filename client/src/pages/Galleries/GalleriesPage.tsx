import { Link } from "react-router-dom";
import PageTitle from "../../shared/components/PageTitle/PageTitle";
import useGaleryTitlePublicGet from "./hooks/useGaleryTitlePublicGet";

export default function GalleriesPage() {
  const { data, isLoading, isError, error } = useGaleryTitlePublicGet();

  if (isLoading) {
    return <div className="centered-container">Betöltés...</div>;
  }

  if (isError) {
    return (
      <div className="centered-container">
        Hiba történt: {error?.message || "Ismeretlen hiba"}
      </div>
    );
  }

  const galleries = data?.data || [];

  if (galleries.length === 0) {
    return (
      <div className="centered-container">
        <p>Nincs galéria!</p>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <PageTitle>Galériák</PageTitle>

      <ul className="gallery-list-container">
        {galleries.map((gallery: any) => (
          <li key={gallery._id} className="gallery-item">
            <Link to={`/galleries/${gallery._id}`} className="gallery-link">
              <h3>{gallery.gallery}</h3>
              <p>{gallery.isPublic ? "Publikus" : "Privát"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
