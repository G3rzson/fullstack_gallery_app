import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useAuthLogout } from "../../../Hooks/useAuthLogout";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../Utils/handleAxiosError";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoutBtn({ setShowAuthMenu }: Props) {
  const { setAccessToken, setUser } = useContextProvider();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuthLogout();

  async function handleLogout() {
    try {
      const res = await mutateAsync();

      toast.success(res.message ?? "Sikeres kijelentkezés!");
      setAccessToken(null);
      setUser(null);
      setShowAuthMenu(false);
      navigate("/");
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }
  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      aria-label="Kijelentkezés"
      className="dark:hover:bg-zinc-600 hover:bg-zinc-300 disabled:cursor-not-allowed w-full p-4 duration-300 cursor-pointer"
    >
      Kijelentkezés
    </button>
  );
}
