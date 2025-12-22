import type { GaleryImageType } from "../../Types/types";

type Props = {
  galeryImagesArray: GaleryImageType[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

export default function ImagePagination({
  galeryImagesArray,
  setIndex,
  index,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2 absolute bottom-0 left-1/2 transform -translate-x-1/2">
      {galeryImagesArray.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          aria-label="alsó lapozó gomb"
          className={`w-2 h-2 rounded-full cursor-pointer ${
            i === index
              ? "bg-black dark:bg-white"
              : "bg-indigo-300 dark:bg-indigo-700"
          }`}
        />
      ))}
    </div>
  );
}
