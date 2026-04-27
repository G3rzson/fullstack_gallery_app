import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import GalleryImages from "../components/GalleryImages";
import { Trash2 } from "lucide-react";
import DeleteBtn from "../components/DeleteBtn";
import { useGalleryContext } from "../hooks/useGalleryContext";
import { useEffect } from "react";

export default function MyGalleryImagePage() {
  const { id } = useParams<{ id: string }>();
  const { deletingIdArray } = useGalleryContext();

  const [searchParams] = useSearchParams();
  const galleryTitle = searchParams.get("title");

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/my-gallery-titles");
    }
  }, [id]);

  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      <Link
        className="block text-center px-4 mt-6 py-2 rounded-lg bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-700 transition-colors"
        to={`/my-gallery/image/add/${id}`}
      >
        Kép hozzáadása
      </Link>

      {deletingIdArray && (
        <DeleteBtn id={id!} mode="imageArray">
          Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
          <Trash2 />
        </DeleteBtn>
      )}

      <GalleryImages galleryTitleId={id!} />
    </>
  );
}
