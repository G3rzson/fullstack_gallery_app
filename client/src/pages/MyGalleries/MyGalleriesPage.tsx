import { Link } from "react-router-dom";
import PageTitle from "../../shared/components/PageTitle/PageTitle";
import useGaleryTitleGet from "./hooks/useGaleryTitleGet";
import "./gallery.css";
import MyGalleriesItems from "./components/MyGalleriesItems";
import type { GalleryTitleType } from "../../types/types";

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

  return (
    <div className="centered-container">
      <PageTitle>Saját galériák</PageTitle>

      <Link to="/my-galleries/title/create" className="back-link">
        Galéria létrehotása
      </Link>

      {galleries.length === 0 ? (
        <div className="centered-container">
          <p>Még nincs galériád. Hozz létre egyet!</p>
        </div>
      ) : (
        <ul className="gallery-list-container">
          {galleries.map((gallery: GalleryTitleType) => (
            <MyGalleriesItems key={gallery._id} gallery={gallery} />
          ))}
        </ul>
      )}
    </div>
  );
}
