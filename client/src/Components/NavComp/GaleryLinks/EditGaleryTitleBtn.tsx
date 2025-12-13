import { useContextProvider } from "../../../Hooks/UseContextProvider";
import { FaRegEdit } from "react-icons/fa";
import type { GaleryTitleType } from "../../../Types/types";

type Props = {
  galeryTitle: GaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditGaleryTitleBtn({ galeryTitle, setIsOpen }: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();

  function handleClick() {
    setEditingGaleryTitleObj(galeryTitle);
    setIsOpen(false);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
    >
      Szerkesztés <FaRegEdit color="orange" />
    </button>
  );
}
