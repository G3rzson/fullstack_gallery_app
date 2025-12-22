import { FaTrash } from "react-icons/fa";
import type { GaleryImageType } from "../../Types/types";
import useGaleryImageDelete from "../../Hooks/useGaleryImageDelete";
import { useEffect } from "react";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import toast from "react-hot-toast";

type Props = {
  imageObj: GaleryImageType;
  urlParams: string | undefined;
};

export default function DeleteImageBtn({ imageObj, urlParams }: Props) {
  if (!imageObj) return null;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Delete") {
      handleDelete();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDelete]);

  const { mutateAsync, isPending } = useGaleryImageDelete(
    imageObj._id,
    urlParams
  );

  async function handleDelete() {
    try {
      const res = await mutateAsync();
      toast.success(res.message || "Sikeresen törölve!");
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer disabled:cursor-not-allowed absolute rounded-b-xl bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 duration-300 bg-zinc-900/50 text-zinc-100 w-full flex items-center justify-center gap-2 p-2"
      aria-label="Kép Törlése"
    >
      Kép törlése <FaTrash color="orangered" />
    </button>
  );
}
