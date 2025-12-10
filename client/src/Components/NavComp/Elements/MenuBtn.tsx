import { HiDotsVertical } from "react-icons/hi";
import type {
  BackendAnswerGaleryTitleType,
  GaleryTitleType,
} from "../../../Types/types";
import { useState } from "react";
import MenuItems from "./MenuItems";

type Props = {
  galeryTitle: GaleryTitleType;
  data: BackendAnswerGaleryTitleType;
};

export default function MenuBtn({ galeryTitle, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <MenuItems
          galeryTitle={galeryTitle}
          data={data}
          setIsOpen={setIsOpen}
        />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 duration-300"
      >
        <HiDotsVertical />
      </button>
    </>
  );
}
