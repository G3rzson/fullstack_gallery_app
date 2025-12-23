import { FaRegEdit, FaTrash } from "react-icons/fa";
import { useContextProvider } from "../../Hooks/useContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGaleryTitleDelete from "../../Hooks/useGaleryTitleDelete";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import type { GaleryTitleType } from "../../Types/types";
import DeleteModal from "../GlobalComponents/DeleteModal";

type Props = {
  galeryTitleObj: GaleryTitleType;
};

export default function DropdownMenu({ galeryTitleObj }: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutateAsync, isPending } = useGaleryTitleDelete(galeryTitleObj._id);
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

  function handleEdit() {
    setEditingGaleryTitleObj(galeryTitleObj);
    navigate(`/galery-title/update/${galeryTitleObj._id}`);
  }

  return (
    <>
      <div
        className={`absolute top-0 right-0 w-full sm:text-[16px] text-sm backdrop-blur-lg rounded z-10`}
      >
        <button
          onClick={handleEdit}
          aria-label="Galéria cím szerkesztése"
          className="w-full flex items-center justify-start gap-2 lg:p-4 sm:p-3 text-[10px] sm:text-sm lg:text-[16px] p-2 cursor-pointer disabled:cursor-not-allowed hover:bg-indigo-300/60 dark:hover:bg-indigo-800/60 duration-300"
        >
          <FaRegEdit color="orange" /> Szerkesztés
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label="Galéria cím törlése"
          className="w-full flex items-center justify-start gap-2 lg:p-4 sm:p-3 text-[10px] sm:text-sm lg:text-[16px] p-2 cursor-pointer disabled:cursor-not-allowed hover:bg-indigo-300/60 dark:hover:bg-indigo-800/60 duration-300"
        >
          <FaTrash color="orangered" /> Törlés
        </button>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          isPending={isPending}
          onModalClose={() => setIsDeleteModalOpen(false)}
          handleDelete={handleDelete}
          text="Biztosan törölni szeretnéd a galériát?"
        />
      )}
    </>
  );
}
