import toast from "react-hot-toast";
import useGaleryTitleDelete from "../../Hooks/useGaleryTitleDelete";
import Loader from "../GlobalComponents/Loader";

type Props = {
  galeryTitleId: string;
  onClose: () => void;
  onModalClose: () => void;
};

export default function DeleteGaleryTitleModal({
  galeryTitleId,
  onClose,
  onModalClose,
}: Props) {
  const { mutateAsync, isPending } = useGaleryTitleDelete(galeryTitleId);
  async function handleDelete() {
    try {
      const res = await mutateAsync();
      toast.success(res.message ?? "Galéria és a hozzá tartozó képek törölve!");
      onModalClose();
      onClose();
    } catch (error) {
      toast.error("Hiba történt a galéria törlése során!");
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
        Biztosan törölni szeretnéd a galériát?
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
            onModalClose();
          }}
          className="py-2 px-4 rounded cursor-pointer dark:bg-green-900 dark:hover:bg-green-700 bg-green-400 hover:bg-green-500 duration-300"
        >
          Mégse
        </button>
      </div>
    </div>
  );
}
