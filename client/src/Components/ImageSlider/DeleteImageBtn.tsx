import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import useGaleryImageDelete from "../../Hooks/useGaleryImageDelete";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import DeleteModal from "../GlobalComponents/DeleteModal";

type Props = {
  imageID: string;
  urlParams: string | undefined;
};

export default function DeleteImageBtn({ imageID, urlParams }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutateAsync, isPending } = useGaleryImageDelete(imageID, urlParams);

  useEffect(() => {
    if (!isDeleteModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDeleteModalOpen(false);
      if (event.key === "Enter") handleDelete();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDeleteModalOpen, handleDelete]);

  async function handleDelete() {
    try {
      const res = await mutateAsync();
      toast.success(res.message || "Sikeresen törölve!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="cursor-pointer disabled:cursor-not-allowed absolute rounded-b-xl bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 bg-zinc-900/50 text-zinc-100 w-full flex items-center justify-center gap-2 p-2"
        aria-label="Kép Törlése"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>

      {isDeleteModalOpen && (
        <DeleteModal
          isPending={isPending}
          handleDelete={handleDelete}
          onModalClose={() => setIsDeleteModalOpen(false)}
          text="Biztosan törölni szeretnéd a képet?"
        />
      )}
    </>
  );
}
