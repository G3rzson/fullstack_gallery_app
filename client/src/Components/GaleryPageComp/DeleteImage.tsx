import { FaTrash } from "react-icons/fa";
import type { GaleryImagesType } from "../../Types/types";
import UseDeleteMutation from "../../Hooks/UseDeleteMutation";

type Props = {
  images: GaleryImagesType[];
  index: number;
  urlParams: string | undefined;
};

export default function DeleteImage({ images, index, urlParams }: Props) {
  const deleteMutation = UseDeleteMutation({
    queryKey: `galeryImages-${urlParams}`,
    url: `http://localhost:8000/galery/image/delete/${images[index]._id}`,
  });

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900/70 w-full rounded-b-xl flex items-center justify-center gap-4 p-4">
      <button
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
        className="cursor-pointer flex items-center gap-2 disabled:cursor-not-allowed"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>
    </div>
  );
}
