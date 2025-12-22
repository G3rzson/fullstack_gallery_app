import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useAuthLogout } from "../../../Hooks/useAuthLogout";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../Utils/handleAxiosError";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoutBtn({ setShowAuthMenu }: Props) {
  const { setAccessToken, setUserObj } = useContextProvider();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuthLogout();

  async function handleLogout() {
    try {
      navigate("/", { replace: true });

      const res = await mutateAsync();

      toast.success(res.message ?? "Sikeres kijelentkezés!");
      setShowAuthMenu(false);
      setAccessToken(null);
      setUserObj(null);
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }
  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      aria-label="Kijelentkezés"
      className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 disabled:cursor-not-allowed w-full p-4 duration-300 cursor-pointer"
    >
      Kijelentkezés
    </button>
  );
}
