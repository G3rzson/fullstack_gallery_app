import { FaTrash } from "react-icons/fa";
import type { GaleryImageType } from "../../Types/types";
import { useEffect, useState } from "react";
import DeleteImageModal from "./DeleteImageModal";

type Props = {
  imageObj: GaleryImageType;
  urlParams: string | undefined;
};

export default function DeleteImageBtn({ imageObj, urlParams }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  if (!imageObj) return null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        setIsDeleteModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteImageModal
          imageId={imageObj._id}
          urlParams={urlParams}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        className="cursor-pointer disabled:cursor-not-allowed absolute rounded-b-xl bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 bg-zinc-900/50 text-zinc-100 w-full flex items-center justify-center gap-2 p-2"
        aria-label="Kép Törlése"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>
    </>
  );
}
