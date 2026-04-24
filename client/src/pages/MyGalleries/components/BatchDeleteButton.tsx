import { Trash2 } from "lucide-react";
import useGaleryImagesDeleteMany from "../hooks/useGaleryImagesDeleteMany";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Modal from "../../../shared/components/Modal/Modal";
import PageLoader from "../../../shared/components/PageLoader/PageLoader";

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
  const { mutateAsync, isPending } = useGaleryImagesDeleteMany(galleryId);

  if (deletingIdArray.length === 0) return null;

  async function handleClick() {
    try {
      await mutateAsync(deletingIdArray);
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
    <>
      <button
        className="delete-all-btn"
        onClick={handleClick}
        disabled={isPending}
      >
        Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
        <Trash2 />
      </button>

      <Modal isOpen={isPending} onClose={() => {}} mode="loader">
        <PageLoader />
      </Modal>
    </>
  );
}
