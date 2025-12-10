import type {
  BackendAnswerGaleryTitleType,
  GaleryTitleType,
} from "../../../Types/types";
import ActionBtn from "./ActionBtn";
import { FaTrash, FaRegEdit } from "react-icons/fa";

type Props = {
  galeryTitle: GaleryTitleType;
  data: BackendAnswerGaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItems({ galeryTitle, data, setIsOpen }: Props) {
  return (
    <div
      className={` ${
        data.galeryTitles.indexOf(galeryTitle) > 4 ? "bottom-12" : "top-12"
      } absolute right-0 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg z-10`}
    >
      <ActionBtn type="edit" galeryTitle={galeryTitle} setIsOpen={setIsOpen}>
        Szerkesztés <FaRegEdit color="orange" />
      </ActionBtn>

      <ActionBtn type="delete" galeryTitle={galeryTitle} setIsOpen={setIsOpen}>
        Törlés <FaTrash color="orangered" />
      </ActionBtn>
    </div>
  );
}
