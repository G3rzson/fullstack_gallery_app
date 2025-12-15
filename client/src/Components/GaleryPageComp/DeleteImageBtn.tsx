import { FaTrash } from "react-icons/fa";
import type { GaleryImageType } from "../../Types/types";
import useGaleryImageDelete from "../../Hooks/useGaleryImageDelete";
import { useEffect } from "react";

type Props = {
  imageObj: GaleryImageType;
  urlParams: string | undefined;
};

export default function DeleteImageBtn({ imageObj, urlParams }: Props) {
  // ha nincs kép, ne jelenítsen meg semmit
  if (!imageObj) return null;

  // figyeli a billentyűzet eseményeket
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Delete") {
      handleDelete();
    }
  }

  // billentyűzet események kezelése
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDelete]);

  // törlés hook definíció
  const deleteMutation = useGaleryImageDelete({
    imageId: imageObj._id,
    urlParams,
  });

  // kép törlése függvény
  function handleDelete() {
    deleteMutation.mutate();
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
