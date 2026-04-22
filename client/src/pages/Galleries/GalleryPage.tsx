import { Link, useParams } from "react-router-dom";
import useGaleryImagePublicGet from "../MyGalleries/hooks/useGaleryImagePublicGet";
import type { GalleryImageType } from "../../types/types";
import GalleryImagePublicListItems from "../MyGalleries/components/GalleryImagePublicListItems";
import "../MyGalleries/gallery.css";

export default function GalleryPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGaleryImagePublicGet(id!);

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

  const galleries: GalleryImageType[] = data?.data || [];

  return (
    <div className="container">
      <h2>Galéria képek</h2>

      <Link to={`/galleries`}>Vissza a galériákhoz</Link>

      {galleries.length === 0 ? (
        <div className="centered-container">
          <p>Még nincs galériád. Hozz létre egyet!</p>
        </div>
      ) : (
        <ul className="gallery-image-list">
          {galleries.map((img) => (
            <GalleryImagePublicListItems key={img._id} galleryImage={img} />
          ))}
        </ul>
      )}
    </div>
  );
}
