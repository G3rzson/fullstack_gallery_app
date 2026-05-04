import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useModalContext } from "../hooks/useModalContext";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useSidebarContext } from "../hooks/useSidebarContext";

export default function DeleteAccountBtn({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const { userObj, setAccessToken, setUserObj } = useUserContext();
  const { setIsModalOpen, setMode } = useModalContext();
  const deleteAccountQuery = useDeleteAccount(userId);
  const { setIsDropdownOpen, setIsSidebarOpen } = useSidebarContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending } = deleteAccountQuery;

  async function handleDeleteAccount() {
    const isDeletingOwnAccount = userId === userObj?._id;

    try {
      setIsModalOpen(true);
      setMode("loader");

      if (isDeletingOwnAccount) {
        sessionStorage.setItem("isLoggingOut", "true");
      }

      const response = await deleteAccountQuery.mutateAsync();

      if (isDeletingOwnAccount) {
        setAccessToken(null);
        setUserObj(null);
        setIsModalOpen(false);
        setMode("default");
        setIsDropdownOpen(false);
        setIsSidebarOpen(false);
        toast.success(response?.message || "Fiók sikeresen törölve!");
        sessionStorage.removeItem("isLoggingOut");
        navigate("/");
      } else {
        // Admin törli másik usert
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsModalOpen(false);
        setMode("default");
        setIsDropdownOpen(false);
        setIsSidebarOpen(false);
        toast.success(response?.message || "Fiók sikeresen törölve!");
      }
    } catch (error: unknown) {
      if (isDeletingOwnAccount) {
        sessionStorage.removeItem("isLoggingOut");
      }
      setIsModalOpen(false);
      setMode("default");
      setIsDropdownOpen(false);
      setIsSidebarOpen(false);
      toast.error(getAxiosErrorMessage(error));
    }
  }

  return (
    <button
      className="delete-account-btn"
      title="Fiók törlése"
      disabled={isPending}
      onClick={handleDeleteAccount}
    >
      {children}
    </button>
  );
}
