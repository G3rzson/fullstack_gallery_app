import { useGalleryContext } from "../hooks/useGalleryContext";
import useGetAllPublicGaleryImage from "../hooks/useGetAllPublicGaleryImage";
import PageLoader from "./PageLoader";
import EmptyList from "./EmptyList";
import ServerError from "./ServerError";
import { useModalContext } from "../hooks/useModalContext";

export default function PublicGalleryImages({ id }: { id: string }) {
  const { setGalleryImageObj } = useGalleryContext();
  const { setIsModalOpen } = useModalContext();

  const { data, isLoading, isError, error } = useGetAllPublicGaleryImage(id);

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0)
    return <EmptyList message={"Nincs kép a galériában!"} />;

  return (
    <ul className="gallery-titles-container">
      {data.map((galleryImage) => (
        <li
          key={galleryImage._id}
          className="w-full h-50 border-2 border-pink-800 dark:border-pink-200 rounded-lg overflow-hidden"
        >
          <img
            src={galleryImage.publicUrl}
            alt={galleryImage.originalName}
            className="w-full h-full object-cover rounded-md cursor-zoom-in"
            loading="lazy"
            onClick={() => {
              setGalleryImageObj(galleryImage);
              setIsModalOpen(true);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
