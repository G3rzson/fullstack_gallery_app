type Props = {
  isPending: boolean;
  onModalClose: () => void;
  handleDelete: () => void;
  text: string;
};

export default function DeleteModal({
  isPending,
  onModalClose,
  handleDelete,
  text,
}: Props) {
  return (
    <div className="fixed inset-0 dark:bg-zinc-800/50 bg-zinc-200/50 backdrop-blur-lg flex flex-col gap-8 items-center justify-center z-50">
      <p className="sm:text-2xl text-[16px]">{text} </p>

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
