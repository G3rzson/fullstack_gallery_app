import { useContextProvider } from "../../../Hooks/useContextProvider";
import type { GaleryTitleType, ResponseType } from "../../../Types/types";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import useGaleryTitleDelete from "../../../Hooks/useGaleryTitleDelete";

type Props = {
  galeryTitleObj: GaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ResponseType<GaleryTitleType[]>;
};

export default function DropdownMenu({
  galeryTitleObj,
  setIsOpen,
  data,
}: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();

  const deleteMutation = useGaleryTitleDelete({
    galeryTitleId: galeryTitleObj._id,
  });

  function handleClick(type: "edit" | "delete") {
    if (type === "edit") {
      setEditingGaleryTitleObj(galeryTitleObj);
    }

    if (type === "delete") {
      deleteMutation.mutate();
    }
    setIsOpen(false);
  }
  return (
    <div
      className={` ${
        data.data.indexOf(galeryTitleObj) > 4 ? "bottom-12" : "top-12"
      } absolute right-0 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg z-10`}
    >
      <button
        onClick={() => handleClick("edit")}
        className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        Szerkesztés <FaRegEdit color="orange" />
      </button>

      <button
        onClick={() => handleClick("delete")}
        className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        Törlés <FaTrash color="orangered" />
      </button>
    </div>
  );
}
