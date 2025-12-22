import { FaRegEdit, FaTrash } from "react-icons/fa";
import type { GaleryTitleType } from "../../Types/types";
import { useContextProvider } from "../../Hooks/useContextProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteGaleryTitleModal from "./DeleteGaleryTitleModal";

type Props = {
  galeryTitleObj: GaleryTitleType;
  onClose: () => void;
};

export default function DropdownMenu({ galeryTitleObj, onClose }: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEdit() {
    setEditingGaleryTitleObj(galeryTitleObj);
    onClose();
    navigate("/galery-title");
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
          onClick={() => setIsModalOpen(true)}
          aria-label="Galéria cím törlése"
          className="w-full flex items-center justify-start gap-2 lg:p-4 sm:p-3 text-[10px] sm:text-sm lg:text-[16px] p-2 cursor-pointer disabled:cursor-not-allowed hover:bg-indigo-300/60 dark:hover:bg-indigo-800/60 duration-300"
        >
          <FaTrash color="orangered" /> Törlés
        </button>
      </div>

      {isModalOpen && (
        <DeleteGaleryTitleModal
          galeryTitleId={galeryTitleObj._id}
          onClose={onClose}
          onModalClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
