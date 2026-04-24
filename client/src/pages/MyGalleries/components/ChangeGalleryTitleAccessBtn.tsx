import { RefreshCw } from "lucide-react";
import useGaleryTitleChangeAccess from "../hooks/useGaleryTitleChangeAccess";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {
  galleryId: string;
  isPublic: boolean;
};

export default function ChangeGalleryTitleAccessBtn({
  galleryId,
  isPublic,
}: Props) {
  const { mutateAsync, isPending } = useGaleryTitleChangeAccess(galleryId);

  async function onChangeAccess() {
    try {
      const response = await mutateAsync({ isPublic });

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
      className="action-btn change-access"
      disabled={isPending}
      onClick={onChangeAccess}
    >
      <RefreshCw />
    </button>
  );
}
