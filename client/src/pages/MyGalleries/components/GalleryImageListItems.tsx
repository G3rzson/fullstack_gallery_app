import { Square, SquareCheck, Trash2 } from "lucide-react";
import type { GalleryImageType } from "../../../types/types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import useGaleryImageDelete from "../hooks/useGaleryImageDelete";

/* todo - kép menyitása modal-ban */
/* todo - az action btn-okat animálni és egy div-be rakni transparent hattérel hover-re*/

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
        className="gallery-image"
      />

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
    </li>
  );
}
