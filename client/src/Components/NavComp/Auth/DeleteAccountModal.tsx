import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useAuthDeleteAccount } from "../../../Hooks/useAuthDeleteAccount";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../Utils/handleAxiosError";
import Loader from "../../GlobalComponents/Loader";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose: () => void;
};

export default function DeleteAccountModal({
  setShowAuthMenu,
  onModalClose,
}: Props) {
  const { setAccessToken, setUserObj } = useContextProvider();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuthDeleteAccount();

  async function handleDeleteAccount() {
    try {
      navigate("/", { replace: true });

      const res = await mutateAsync();
      toast.success(res.message ?? "Fiók sikeresen törölve!");
      setShowAuthMenu(false);
      setAccessToken(null);
      setUserObj(null);
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
        Biztosan törölni szeretnéd a fiókodat? Ez a művelet végérvényes!
      </p>

      <div className="flex items-center justify-center gap-6">
        <button
          aria-label="Törlés gomb megerősítés"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAccount();
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
