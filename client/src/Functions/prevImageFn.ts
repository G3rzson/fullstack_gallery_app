import type { GaleryImagesType } from "../Types/types";

export function prevImageFn(
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  images: GaleryImagesType[]
) {
  setIndex((i) => (i - 1 + images.length) % images.length);
}
