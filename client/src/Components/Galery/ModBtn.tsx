import { HiDotsVertical } from "react-icons/hi";
import type {
  BackendAnswerGaleryTitleType,
  GaleryTitleType,
} from "../../Types/types";
import { useState } from "react";
import ActionBtn from "./ActionBtn";

type Props = {
  galeryTitle: GaleryTitleType;
  data: BackendAnswerGaleryTitleType;
};

export default function ModBtn({ galeryTitle, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && (
        <div
          className={` ${
            data.galeryTitles.indexOf(galeryTitle) > 4 ? "bottom-12" : "top-12"
          } absolute right-0 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg z-10`}
        >
          <ActionBtn
            type="Szerkesztés"
            galeryTitle={galeryTitle}
            setIsOpen={setIsOpen}
          />
          <ActionBtn
            type="Törlés"
            galeryTitle={galeryTitle}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 duration-300"
      >
        <HiDotsVertical />
      </button>
    </div>
  );
}
