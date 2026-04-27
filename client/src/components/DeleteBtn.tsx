import toast from "react-hot-toast";
import useGaleryImageDelete from "../hooks/useGaleryImageDelete";
import useMyGaleryTitleDelete from "../hooks/useMyGaleryTitleDelete";
import useMyGaleryImagesDeleteMany from "../hooks/useMyGaleryImagesDeleteMany";
import { useGalleryContext } from "../hooks/useGalleryContext";
import { useModalClose } from "../hooks/useModalClose";
import { useModalContext } from "../hooks/useModalContext";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";

export default function DeleteBtn({
  children,
  id,
  mode,
}: {
  children: React.ReactNode;
  id: string;
  mode: "image" | "title" | "imageArray";
}) {
  const deleteImageQuery = useGaleryImageDelete(id);
  const deleteTitleQuery = useMyGaleryTitleDelete(id);
  const deleteImageArrayQuery = useMyGaleryImagesDeleteMany(id);
  const { deletingIdArray, setDeletingIdArray } = useGalleryContext();
  const { setIsModalOpen, setMode } = useModalContext();
  const handleModalClose = useModalClose();

  let mutateAsync: any, isPending: boolean;
  if (mode === "image") {
    ({ mutateAsync, isPending } = deleteImageQuery);
  } else if (mode === "title") {
    ({ mutateAsync, isPending } = deleteTitleQuery);
  } else {
    ({ mutateAsync, isPending } = deleteImageArrayQuery);
  }

  if (mode === "imageArray" && deletingIdArray.length === 0) return null;

  async function handleDelete() {
    try {
      setIsModalOpen(true);
      setMode("loader");
      let response;
      if (mode === "imageArray") {
        response = await mutateAsync(deletingIdArray);
        setDeletingIdArray([]);
      } else {
        response = await mutateAsync();
      }
      toast.success(response?.message || "Sikeres törlés!");
    } catch (error: unknown) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      handleModalClose();
    }
  }

  return (
    <button
      className={`${mode === "title" ? "action-btn" : mode === "image" ? "image-action-btn" : "delete-array-btn"}`}
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
