import { Trash2 } from "lucide-react";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

export default function DeleteAccountBtn({
  closeDropdown,
}: {
  closeDropdown: () => void;
}) {
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();
  const { setAccessToken, setUserObj } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteAccount();

  async function handleDeleteAccount() {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const response = await mutateAsync();
      toast.success(response.message);
      setAccessToken(null);
      setUserObj(null);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      closeDropdown();
      handleModalClose();
    }
  }

  return (
    <button
      onClick={handleDeleteAccount}
      disabled={isPending}
      aria-label="Kijelentkezés"
      className="flex items-center justify-center gap-2 p-2 rounded cursor-pointer dark:text-red-400 text-red-800 dark:hover:bg-red-800 hover:bg-red-300 transition-colors duration-300"
    >
      <Trash2 /> Fiók törlése
    </button>
  );
}
