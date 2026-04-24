import { Square, SquareCheck, Trash2 } from "lucide-react";
import type { GalleryImageType } from "../../../types/types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import useGaleryImageDelete from "../hooks/useGaleryImageDelete";
import Modal from "../../../shared/components/Modal/Modal";
import { useState } from "react";
import PageLoader from "../../../shared/components/PageLoader/PageLoader";

type Props = {
  galleryImage: GalleryImageType;
  deletingIdArray: string[];
  setDeletingIdArray: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GalleryImageListItems({
  galleryImage,
  deletingIdArray,
  setDeletingIdArray,
}: Props) {
  const { mutateAsync, isPending } = useGaleryImageDelete(galleryImage._id);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  async function handleDelete() {
    try {
      const response = await mutateAsync();

      toast.success(response.message);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;

      toast.error(errorMessage);
    }
  }

  function handleCheck() {
    setDeletingIdArray((prev) => {
      if (prev.includes(galleryImage._id)) {
        return prev.filter((id) => id !== galleryImage._id);
      } else {
        return [...prev, galleryImage._id];
      }
    });
  }

  return (
    <li
      key={galleryImage._id}
      className={`card ${deletingIdArray.includes(galleryImage._id) ? "selected" : ""}`}
    >
      <img
        src={galleryImage.publicUrl}
        alt={galleryImage.originalName}
        onClick={() => setIsImageModalOpen(true)}
        className="gallery-image"
      />

      <div className="action-btn-container">
        <button
          className="delete-btn"
          disabled={isPending || deletingIdArray.includes(galleryImage._id)}
          onClick={handleDelete}
        >
          <Trash2 />
        </button>

        {/* animálni az icon váltást !*/}
        <button className="check-btn" disabled={false} onClick={handleCheck}>
          {deletingIdArray.includes(galleryImage._id) ? (
            <SquareCheck />
          ) : (
            <Square />
          )}
        </button>
      </div>

      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      >
        <img
          src={galleryImage.publicUrl}
          alt={galleryImage.originalName}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            width: "auto",
            height: "auto",
            borderRadius: "8px",
            objectFit: "contain",
          }}
        />
      </Modal>

      <Modal isOpen={isPending} onClose={() => {}} mode="loader">
        <PageLoader />
      </Modal>
    </li>
  );
}
