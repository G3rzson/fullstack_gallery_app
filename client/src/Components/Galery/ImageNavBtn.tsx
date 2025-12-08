import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import type { GaleryImagesType } from "../../Types/types";

type Props = {
  images: GaleryImagesType[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: "prev" | "next";
};

export default function ImageNavBtn({ images, setIndex, direction }: Props) {
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <button
      onClick={direction === "prev" ? prev : next}
      className={`absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer ${
        direction === "prev" ? "left-5" : "right-5"
      }`}
    >
      {direction === "prev" ? (
        <FaArrowAltCircleLeft />
      ) : (
        <FaArrowAltCircleRight />
      )}
    </button>
  );
}
