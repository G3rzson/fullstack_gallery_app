import { useContextProvider } from "../../../Hooks/useContextProvider";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import DeleteAccountBtn from "./DeleteAccountBtn";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthMenu({ setShowAuthMenu }: Props) {
  const { userObj } = useContextProvider();

  return (
    <div className="fixed text-center left-4 w-40 bottom-16 rounded overflow-hidden">
      {userObj ? (
        <>
          <p className="p-4 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300">
            {userObj.username}
          </p>

          <LogoutBtn setShowAuthMenu={setShowAuthMenu} />
          <DeleteAccountBtn setShowAuthMenu={setShowAuthMenu} />
        </>
      ) : (
        <>
          <Link
            className="block w-full p-4 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300"
            to="/auth/login"
          >
            Bejelentkezés
          </Link>
          <Link
            className="block w-full p-4 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300"
            to="/auth/register"
          >
            Regisztráció
          </Link>
        </>
      )}
    </div>
  );
}
