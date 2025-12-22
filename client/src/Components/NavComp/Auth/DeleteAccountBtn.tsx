import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { handleAxiosError } from "../../../Utils/handleAxiosError";
import toast from "react-hot-toast";
import { useAuthDeleteAccount } from "../../../Hooks/useAuthDeleteAccount";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountBtn({ setShowAuthMenu }: Props) {
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

  return (
    <button
      onClick={handleDeleteAccount}
      disabled={isPending}
      aria-label="Fiók törlése"
      className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300 disabled:cursor-not-allowed w-full p-4 cursor-pointer"
    >
      Fiók törlése
    </button>
  );
}
