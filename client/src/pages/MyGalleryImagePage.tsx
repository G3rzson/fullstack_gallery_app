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
import { useUserContext } from "../hooks/useUserContext";
import PageLoader from "../components/PageLoader";
import { toast } from "react-hot-toast/headless";

export default function MyGalleryImagePage() {
  const { id } = useParams<{ id: string }>();
  const { deletingIdArray } = useGalleryContext();
  const { userObj, isAuthLoading } = useUserContext();
  const [searchParams] = useSearchParams();
  const galleryTitle = searchParams.get("title");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !userObj) {
      toast.error("Kérlek jelentkezz be a saját galériáid megtekintéséhez!");
      setTimeout(() => navigate("/user/login", { replace: true }), 0);
    }
  }, [userObj, isAuthLoading, navigate]);

  useEffect(() => {
    if (!id) {
      navigate("/my-gallery-titles");
    }
  }, [id]);

  if (isAuthLoading || !userObj) {
    return <PageLoader />;
  }

  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      <Link className="submit-btn mt-4" to={`/my-gallery/image/add/${id}`}>
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
