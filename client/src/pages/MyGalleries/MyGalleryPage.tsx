import { Link, useParams } from "react-router-dom";
import useGaleryImageGet from "./hooks/useGaleryImageGet";
import type { GalleryImageType } from "../../types/types";
import GalleryImageListItems from "./components/GalleryImageListItems";
import "./gallery.css";
import { useState } from "react";
import BatchDeleteButton from "./components/BatchDeleteButton";

export default function MyGalleryPage() {
  const [deletingIdArray, setDeletingIdArray] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGaleryImageGet(id!);

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

      <div className="link-container">
        <Link to={`/my-galleries`}>Vissza a galériákhoz</Link>
        <Link to={`/my-galleries/${id}/image/add`}>Kép hozzáadása</Link>
      </div>

      <BatchDeleteButton
        galleryId={id!}
        deletingIdArray={deletingIdArray}
        setDeletingIdArray={setDeletingIdArray}
      />

      {galleries.length === 0 ? (
        <div className="centered-container">
          <p>Még nincs galériád. Hozz létre egyet!</p>
        </div>
      ) : (
        <ul className="gallery-image-list">
          {galleries.map((img) => (
            <GalleryImageListItems
              key={img._id}
              galleryImage={img}
              deletingIdArray={deletingIdArray}
              setDeletingIdArray={setDeletingIdArray}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
