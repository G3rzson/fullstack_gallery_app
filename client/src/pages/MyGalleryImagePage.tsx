import { Link, useParams } from "react-router-dom";
import GalleryImages from "../components/GalleryImages";
import { Trash2 } from "lucide-react";
import DeleteBtn from "../components/DeleteBtn";
import { useGalleryContext } from "../hooks/useGalleryContext";

export default function MyGalleryImagePage() {
  const { id } = useParams<{ id: string }>();
  const { deletingIdArray } = useGalleryContext();

  return (
    <>
      <h1 className="page-title">Galéria képek</h1>

      <Link
        className="block text-center px-4 mt-6 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 dark:bg-pink-800 dark:hover:bg-pink-700 transition-colors"
        to={`/my-gallery/image/add/${id}`}
      >
        Kép hozzáadása
      </Link>

      <DeleteBtn id={id!} mode="imageArray">
        Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
        <Trash2 />
      </DeleteBtn>

      <GalleryImages id={id!} />
    </>
  );
}
