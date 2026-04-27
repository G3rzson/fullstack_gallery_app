import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useGaleryImagePublicGet from "../hooks/useGaleryImagePublicGet";
import PageLoader from "../components/PageLoader";
import ServerError from "../components/ServerError";
import EmptyList from "../components/EmptyList";
import { useGalleryContext } from "../hooks/useGalleryContext";

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

  const { data, isLoading, isError, error } = useGaleryImagePublicGet(id!);

  const { setGalleryImageObj, setIsImageModalOpen } = useGalleryContext();

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0) return <EmptyList />;

  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      <ul className="gallery-titles-container">
        {data.map((galleryImage) => (
          <li key={galleryImage._id} className="w-full h-50">
            <img
              src={galleryImage.publicUrl}
              alt={galleryImage.originalName}
              className="w-full h-full object-cover rounded-md cursor-zoom-in"
              loading="lazy"
              onClick={() => {
                setGalleryImageObj(galleryImage);
                setIsImageModalOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
