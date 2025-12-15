import { useContextProvider } from "../../../Hooks/useContextProvider";
import type { GaleryTitleType } from "../../../Types/types";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import useGaleryTitleDelete from "../../../Hooks/useGaleryTitleDelete";

type Props = {
  galeryTitleObj: GaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  galeryTitleArray: GaleryTitleType[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
};

export default function DropdownMenu({
  galeryTitleObj,
  setIsOpen,
  galeryTitleArray,
  dropdownRef,
}: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();

  // Galéria cím törlése hook
  const deleteMutation = useGaleryTitleDelete({
    galeryTitleId: galeryTitleObj._id,
  });

  // Menü gombok kezelése
  function handleClick(type: "edit" | "delete") {
    if (type === "edit") {
      setEditingGaleryTitleObj(galeryTitleObj);
    } else if (type === "delete") {
      deleteMutation.mutate();
    }
    setIsOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      className={` ${
        galeryTitleArray.indexOf(galeryTitleObj) > 4 ? "bottom-12" : "top-12"
      } absolute right-0 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg z-10`}
    >
      <button
        onClick={() => handleClick("edit")}
        aria-label="Galéria cím szerkesztése"
        className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        Szerkesztés <FaRegEdit color="orange" />
      </button>

      <button
        onClick={() => handleClick("delete")}
        aria-label="Galéria cím törlése"
        className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        Törlés <FaTrash color="orangered" />
      </button>
    </div>
  );
}
