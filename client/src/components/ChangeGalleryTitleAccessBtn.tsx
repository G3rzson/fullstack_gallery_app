import { RefreshCw } from "lucide-react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import useGaleryTitleChangeAccess from "../hooks/useMyGaleryTitleChangeAccess";

type Props = {
  galleryTitleId: string;
  isPublic: boolean;
};

export default function ChangeGalleryTitleAccessBtn({
  galleryTitleId,
  isPublic,
}: Props) {
  const { mutateAsync, isPending } = useGaleryTitleChangeAccess(galleryTitleId);

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
      className="action-btn"
      disabled={isPending}
      onClick={onChangeAccess}
    >
      <RefreshCw />
    </button>
  );
}
