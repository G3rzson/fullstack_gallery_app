import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PublicGalleryImages from "../components/PublicGalleryImages";

export default function SinglePublicGalleryPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const galleryTitle = searchParams.get("title");

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/public-gallery-titles");
    }
  }, [id]);

  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      <PublicGalleryImages id={id as string} />
    </>
  );
}
