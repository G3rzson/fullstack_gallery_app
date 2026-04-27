import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import useGaleryTitleChangeAccess from "../hooks/useMyGaleryTitleChangeAccess";
import { useModalClose } from "../hooks/useModalClose";
import { useModalContext } from "../hooks/useModalContext";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";

type Props = {
  galleryTitleId: string;
  isPublic: boolean;
};

export default function ChangeGalleryTitleAccessBtn({
  galleryTitleId,
  isPublic,
}: Props) {
  const { mutateAsync, isPending } = useGaleryTitleChangeAccess(galleryTitleId);
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();

  async function onChangeAccess() {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const response = await mutateAsync({ isPublic });
      toast.success(response.message);
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      handleModalClose();
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
