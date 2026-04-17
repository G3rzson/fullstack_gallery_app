import { Link } from "react-router-dom";
import PageTitle from "../../shared/components/PageTitle/PageTitle";
import useGaleryTitleGet from "./hooks/useGaleryTitleGet";
import "./gallery.css";

export default function MyGalleriesPage() {
  const { data, isLoading, isError, error } = useGaleryTitleGet();

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
        <p>Még nincs galériád. Hozz létre egyet!</p>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <PageTitle>Saját galériák</PageTitle>

      <Link to="/my-galleries/title/create" className="back-link">
        Galéria létrehotása
      </Link>

      <ul className="gallery-list-container">
        {galleries.map((gallery: any) => (
          <li key={gallery._id} className="gallery-item">
            <Link to={`/my-galleries/${gallery._id}`} className="gallery-link">
              <h3>{gallery.galeryTitle}</h3>
              <p>{gallery.isPublic ? "Publikus" : "Privát"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
