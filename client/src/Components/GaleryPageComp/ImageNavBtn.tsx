import { nextImageFn } from "../../Functions/nextImageFn";
import { prevImageFn } from "../../Functions/prevImageFn";
import type { GaleryImagesType } from "../../Types/types";

type Props = {
  children: React.ReactNode;
  images: GaleryImagesType[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: "prev" | "next";
};

export default function ImageNavBtn({
  children,
  images,
  setIndex,
  direction,
}: Props) {
  return (
    <button
      onClick={
        direction === "prev"
          ? () => prevImageFn(setIndex, images)
          : () => nextImageFn(setIndex, images)
      }
      className={`absolute top-1/2 -translate-y-1/2 bg-transparent cursor-pointer ${
        direction === "prev" ? "left-5" : "right-5"
      }`}
    >
      {children}
    </button>
  );
}
