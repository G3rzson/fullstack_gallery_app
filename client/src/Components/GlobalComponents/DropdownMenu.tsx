import { FaRegEdit, FaTrash } from "react-icons/fa";
import type { GaleryTitleType } from "../../Types/types";
import { useContextProvider } from "../../Hooks/useContextProvider";
import useGaleryTitleDelete from "../../Hooks/useGaleryTitleDelete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  galeryTitleObj: GaleryTitleType;
  onClose: () => void;
};

export default function DropdownMenu({ galeryTitleObj, onClose }: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useGaleryTitleDelete(galeryTitleObj._id);

  async function handleClick(type: "edit" | "delete") {
    if (type === "edit") {
      setEditingGaleryTitleObj(galeryTitleObj);
      onClose();
      navigate("/galery-title");
    } else if (type === "delete") {
      try {
        const res = await mutateAsync();
        toast.success(
          res.message ?? "Galéria és a hozzá tartozó képek törölve!"
        );
        onClose();
      } catch (error) {
        toast.error("Hiba történt a galéria törlése során!");
      }
    }
  }

  return (
    <div
      className={`absolute top-0 right-0 w-full sm:text-[16px] text-sm bg-zinc-100/70 dark:bg-zinc-800/70 backdrop-blur-xs border border-zinc-300 dark:border-zinc-700 rounded z-10`}
    >
      <button
        onClick={() => handleClick("edit")}
        aria-label="Galéria cím szerkesztése"
        disabled={isPending}
        className="w-full flex items-center justify-start gap-2 cursor-pointer disabled:cursor-not-allowed p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        <FaRegEdit color="orange" /> Szerkesztés
      </button>

      <button
        onClick={() => handleClick("delete")}
        disabled={isPending}
        aria-label="Galéria cím törlése"
        className="w-full flex items-center justify-start gap-2 cursor-pointer disabled:cursor-not-allowed p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
      >
        <FaTrash color="orangered" /> Törlés
      </button>
    </div>
  );
}
