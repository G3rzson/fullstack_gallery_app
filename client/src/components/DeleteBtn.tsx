import toast from "react-hot-toast";
import useMyGalleryImageDelete from "../hooks/useMyGaleryImageDelete";
import useMyGaleryTitleDelete from "../hooks/useMyGaleryTitleDelete";
import useMyGaleryImagesDeleteMany from "../hooks/useMyGaleryImagesDeleteMany";
import { useGalleryContext } from "../hooks/useGalleryContext";
import { useModalClose } from "../hooks/useModalClose";
import { useModalContext } from "../hooks/useModalContext";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import type { BaseResponseType } from "../types/types";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useSidebarContext } from "../hooks/useSidebarContext";

export default function DeleteBtn({
  children,
  id,
  mode,
}: {
  children: React.ReactNode;
  id: string;
  mode: "image" | "title" | "imageArray" | "user";
}) {
  const deleteImageQuery = useMyGalleryImageDelete(id);
  const deleteTitleQuery = useMyGaleryTitleDelete(id);
  const deleteImageArrayQuery = useMyGaleryImagesDeleteMany();
  const deleteAccountQuery = useDeleteAccount(id);
  const { deletingIdArray, setDeletingIdArray } = useGalleryContext();
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();
  const navigate = useNavigate();
  const { setAccessToken, setUserObj } = useUserContext();
  const { setIsDropdownOpen, setIsSidebarOpen } = useSidebarContext();

  const mutation =
    mode === "image"
      ? deleteImageQuery
      : mode === "title"
        ? deleteTitleQuery
        : mode === "user"
          ? deleteAccountQuery
          : deleteImageArrayQuery;

  const { isPending } = mutation;

  if (mode === "imageArray" && deletingIdArray.length === 0) {
    return null;
  }

  async function handleDelete() {
    try {
      setIsModalOpen(true);
      setMode("loader");

      let response: BaseResponseType;

      if (mode === "imageArray") {
        response = await deleteImageArrayQuery.mutateAsync(deletingIdArray);
        setDeletingIdArray([]);
      } else if (mode === "image") {
        response = await deleteImageQuery.mutateAsync();
      } else if (mode === "title") {
        response = await deleteTitleQuery.mutateAsync();
      } else if (mode === "user") {
        response = await deleteAccountQuery.mutateAsync();
        // Set flag to prevent "login required" toast during delete account
        sessionStorage.setItem("isLoggingOut", "true");

        setAccessToken(null);
        setUserObj(null);
        navigate("/", { replace: true });
        setIsDropdownOpen(false);
        setIsSidebarOpen(false);

        // Clear flag after navigation
        setTimeout(() => sessionStorage.removeItem("isLoggingOut"), 100);
      } else {
        return null;
      }

      toast.success(response?.message || "Sikeres művelet!");
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      handleModalClose();
    }
  }

  return (
    <button
      className={`${mode === "title" ? "action-btn" : mode === "image" ? "image-action-btn" : mode === "user" ? "delete-account-btn" : "delete-array-btn"}`}
      title="Törlés"
      disabled={
        isPending ||
        (mode === "imageArray" ? false : deletingIdArray.includes(id))
      }
      onClick={handleDelete}
    >
      {children}
    </button>
  );
}
