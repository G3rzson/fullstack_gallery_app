import { useContextProvider } from "../../../Hooks/useContextProvider";
import { Link } from "react-router-dom";
import { useAuthLogout } from "../../../Hooks/useAuthLogout";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthMenu({ setShowAuthMenu }: Props) {
  const { user, setAccessToken, setUser } = useContextProvider();

  const logoutMutation = useAuthLogout();

  // kijelentkezés kezelése
  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setAccessToken(null);
        setUser(null);
        setShowAuthMenu(false);
      },
    });
  }

  return (
    <div className="absolute text-center bottom-12 w-full shadow-lg dark:bg-zinc-800 bg-zinc-100 rounded overflow-hidden">
      {user ? (
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="dark:hover:bg-zinc-600 hover:bg-zinc-300 disabled:cursor-not-allowed w-full p-4 duration-300 cursor-pointer"
        >
          Kijelentkezés
        </button>
      ) : (
        <>
          <Link
            className="block dark:hover:bg-zinc-600 hover:bg-zinc-300 w-full p-4 duration-300"
            to="/auth/login"
          >
            Bejelentkezés
          </Link>
          <Link
            className="block dark:hover:bg-zinc-600 hover:bg-zinc-300 w-full p-4 duration-300"
            to="/auth/register"
          >
            Regisztráció
          </Link>
        </>
      )}
    </div>
  );
}
