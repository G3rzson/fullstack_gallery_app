import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { GaleryImageType } from "../../Types/types";
import useGaleryImageDelete from "../../Hooks/useGaleryImageDelete";

type Props = {
  images: GaleryImageType[];
  index: number;
  urlParams: string | undefined;
};

export default function DeleteImageBtn({ images, index, urlParams }: Props) {
  const navigate = useNavigate();

  const deleteMutation = useGaleryImageDelete({
    imageId: images[index]._id,
    urlParams,
  });

  function handleDelete() {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        if (images.length === 1) {
          navigate("/");
        }
      },
    });
  }

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900/70 w-full rounded-b-xl flex items-center justify-center gap-4 p-4">
      <button
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        className="cursor-pointer flex items-center gap-2 disabled:cursor-not-allowed"
        aria-label="Kép Törlése"
      >
        Kép törlése <FaTrash color="orangered" />
      </button>
    </div>
  );
}
