import { Trash2 } from "lucide-react";
import EmptyList from "./EmptyList";
import PageLoader from "./PageLoader";
import ServerError from "./ServerError";
import GalleryImageCheckbox from "./GalleryImageCheckbox";
import DeleteBtn from "./DeleteBtn";
import useMyGaleryImageGet from "../hooks/useMyGaleryImageGet";
import { useGalleryContext } from "../hooks/useGalleryContext";

export default function GalleryImages({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useMyGaleryImageGet(id!);

  const { deletingIdArray, setGalleryImageObj, setIsImageModalOpen } =
    useGalleryContext();

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  if (!data || data.length === 0) return <EmptyList />;

  return (
    <>
      <ul className="image-container">
        {data.map((galleryImage) => (
          <li
            key={galleryImage._id}
            className={`image-card ${deletingIdArray.includes(galleryImage._id) ? "selected" : ""}`}
          >
            <img
              src={galleryImage.publicUrl}
              alt={galleryImage.originalName}
              className="image"
              loading="lazy"
              onClick={() => {
                setGalleryImageObj(galleryImage);
                setIsImageModalOpen(true);
              }}
            />

            <div className="action-btn-container">
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
