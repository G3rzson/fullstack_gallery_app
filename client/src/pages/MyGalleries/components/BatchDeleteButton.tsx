import { Trash2 } from "lucide-react";
import useGaleryImagesDeleteMany from "../hooks/useGaleryImagesDeleteMany";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

type Props = {
  galleryId: string;
  deletingIdArray: string[];
  setDeletingIdArray: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function BatchDeleteButton({
  galleryId,
  deletingIdArray,
  setDeletingIdArray,
}: Props) {
  const { mutateAsync: deleteMany, isPending: isBatchDeleting } =
    useGaleryImagesDeleteMany(galleryId);

  if (deletingIdArray.length === 0) return null;

  async function handleClick() {
    try {
      await deleteMany(deletingIdArray);
      setDeletingIdArray([]);
      toast.success("Kijelölt képek törölve!");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      toast.error(errorMessage);
    }
  }

  return (
    <button
      className="delete-all-btn"
      onClick={handleClick}
      disabled={isBatchDeleting}
    >
      Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
      <Trash2 />
    </button>
  );
}
