import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import useGaleryImageDelete from "../hooks/useGaleryImageDelete";
import useMyGaleryTitleDelete from "../hooks/useMyGaleryTitleDelete";
import useMyGaleryImagesDeleteMany from "../hooks/useMyGaleryImagesDeleteMany";
import { useGalleryContext } from "../hooks/useGalleryContext";

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
      let response;
      if (mode === "imageArray") {
        response = await mutateAsync(deletingIdArray);
        setDeletingIdArray([]);
      } else {
        response = await mutateAsync();
      }
      toast.success(response?.message || "Sikeres törlés!");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      toast.error(errorMessage);
    }
  }

  return (
    <button
      className="action-btn delete-btn"
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
