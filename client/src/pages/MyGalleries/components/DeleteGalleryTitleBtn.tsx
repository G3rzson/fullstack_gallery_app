import type { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useGaleryTitleDelete from "../hooks/useGaleryTitleDelete";

export default function DeleteGalleryTitleBtn({
  galleryId,
}: {
  galleryId: string;
}) {
  const { mutateAsync, isPending } = useGaleryTitleDelete(galleryId);

  async function onDeleteGalleryTitle() {
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

  return (
    <button
      className="action-btn delete"
      onClick={onDeleteGalleryTitle}
      disabled={isPending}
    >
      <Trash2 />
    </button>
  );
}
