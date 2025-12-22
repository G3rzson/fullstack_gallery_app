import toast from "react-hot-toast";
import useGaleryImageDelete from "../../Hooks/useGaleryImageDelete";
import { handleAxiosError } from "../../Utils/handleAxiosError";
import { useEffect } from "react";
import Loader from "../GlobalComponents/Loader";

type Props = {
  imageId: string;
  urlParams: string | undefined;
  onClose: () => void;
};

export default function DeleteImageModal({
  imageId,
  urlParams,
  onClose,
}: Props) {
  const { mutateAsync, isPending } = useGaleryImageDelete(imageId, urlParams);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleDelete();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleDelete() {
    if (isPending) return;
    try {
      const res = await mutateAsync();
      toast.success(res.message || "Sikeresen törölve!");
      onClose();
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  if (isPending) {
    return (
      <div className="fixed inset-0 dark:bg-zinc-900/90 bg-zinc-200/90 flex flex-col gap-8 items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 dark:bg-zinc-900/90 bg-zinc-200/90 flex flex-col gap-8 items-center justify-center z-50">
      <p className="sm:text-2xl text-[16px]">
        Biztosan törölni szeretnéd a képet?
      </p>

      <div className="flex items-center justify-center gap-6">
        <button
          aria-label="Törlés gomb megerősítés"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="py-2 px-4 rounded cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-400 hover:bg-red-500 duration-300"
        >
          Törlés
        </button>

        <button
          aria-label="Mégse gomb"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="py-2 px-4 rounded cursor-pointer dark:bg-green-900 dark:hover:bg-green-700 bg-green-400 hover:bg-green-500 duration-300"
        >
          Mégse
        </button>
      </div>
    </div>
  );
}
