import type { GaleryImagesType } from "../../Types/types";

type Props = {
  images: GaleryImagesType[];
  index: number;
};

export default function ImageView({ images, index }: Props) {
  return (
    <img
      src={`http://localhost:8000${images[index].url}`}
      alt={images[index].filename}
      className="h-full object-contain"
    />
  );
}
