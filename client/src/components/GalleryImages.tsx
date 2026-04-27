import { Trash2 } from "lucide-react";
import EmptyList from "./EmptyList";
import PageLoader from "./PageLoader";
import ServerError from "./ServerError";
import GalleryImageCheckbox from "./GalleryImageCheckbox";
import DeleteBtn from "./DeleteBtn";
import useMyGaleryImageGet from "../hooks/useMyGaleryImageGet";
import { useGalleryContext } from "../hooks/useGalleryContext";
import { useModalContext } from "../hooks/useModalContext";

export default function GalleryImages({
  galleryTitleId,
}: {
  galleryTitleId: string;
}) {
  const { deletingIdArray, setGalleryImageObj } = useGalleryContext();
  const { setIsModalOpen } = useModalContext();
  const { data, isLoading, isError, error } = useMyGaleryImageGet(
    galleryTitleId!,
  );

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0) return <EmptyList />;

  return (
    <>
      <ul className="gallery-titles-container">
        {data.map((galleryImage) => (
          <li
            key={galleryImage._id}
            className="w-full h-50 group relative rounded-lg overflow-hidden"
          >
            <img
              src={galleryImage.publicUrl}
              alt={galleryImage.originalName}
              className="w-full h-full object-cover cursor-zoom-in"
              loading="lazy"
              onClick={() => {
                setGalleryImageObj(galleryImage);
                setIsModalOpen(true);
              }}
            />

            <span
              className={`pointer-events-none absolute top-0 left-0 h-full w-full dark:bg-pink-900/40 bg-pink-300/40 ${deletingIdArray.includes(galleryImage._id) ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
            />

            <div className="absolute bottom-0 right-0 flex items-center z-20 justify-between gap-2 p-2 bg-black/50 w-full sm:opacity-0 opacity-100 group-hover:opacity-100 transition-all duration-300">
              <DeleteBtn id={galleryImage._id} mode="image">
                <Trash2 />
              </DeleteBtn>

              <GalleryImageCheckbox galleryImageId={galleryImage._id} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
