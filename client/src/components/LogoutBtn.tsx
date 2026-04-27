import { LogOut } from "lucide-react";
import { useModalContext } from "../hooks/useModalContext";
import { useModalClose } from "../hooks/useModalClose";
import { useNavigate } from "react-router-dom";
import { useUserLogout } from "../hooks/useUserLogout";
import { useUserContext } from "../hooks/useUserContext";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";

export default function LogoutBtn({
  closeDropdown,
}: {
  closeDropdown: () => void;
}) {
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();
  const { setAccessToken, setUserObj } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useUserLogout();

  async function handleLogout() {
    try {
      setIsModalOpen(true);
      setMode("loader");
      const response = await mutateAsync();
      toast.success(response.message);
      setTimeout(() => {
        navigate("/", { replace: true });
        setAccessToken(null);
        setUserObj(null);
      }, 0);
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      closeDropdown();
      handleModalClose();
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      aria-label="Kijelentkezés"
      className="flex items-center justify-center gap-2 p-2 rounded cursor-pointer dark:hover:bg-pink-900 hover:bg-pink-200 transition-colors duration-300"
    >
      <LogOut /> Kijelentkezés
    </button>
  );
}
