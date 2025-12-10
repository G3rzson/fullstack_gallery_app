import type { GaleryImagesType } from "../../Types/types";

type Props = {
  images: GaleryImagesType[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

export default function ImagePagination({ images, setIndex, index }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            i === index ? "bg-zinc-900" : "bg-zinc-100"
          }`}
        />
      ))}
    </div>
  );
}
