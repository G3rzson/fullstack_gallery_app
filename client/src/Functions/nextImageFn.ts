import type { GaleryImagesType } from "../Types/types";

export function nextImageFn(
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  images: GaleryImagesType[]
) {
  setIndex((i) => (i + 1) % images.length);
}
