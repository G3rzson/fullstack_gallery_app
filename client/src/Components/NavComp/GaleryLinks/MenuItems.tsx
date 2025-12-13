import type { ResponseType, GaleryTitleType } from "../../../Types/types";
import DeleteGaleryBtn from "./DeleteGaleryBtn";
import EditGaleryTitleBtn from "./EditGaleryTitleBtn";

type Props = {
  galeryTitle: GaleryTitleType;
  data: ResponseType<GaleryTitleType[]>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItems({ galeryTitle, data, setIsOpen }: Props) {
  return (
    <div
      className={` ${
        data.data.indexOf(galeryTitle) > 4 ? "bottom-12" : "top-12"
      } absolute right-0 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg z-10`}
    >
      <EditGaleryTitleBtn galeryTitle={galeryTitle} setIsOpen={setIsOpen} />

      <DeleteGaleryBtn galeryTitle={galeryTitle} setIsOpen={setIsOpen} />
    </div>
  );
}
