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
    <div className="absolute text-center bottom-12 w-full shadow-lg dark:bg-zinc-800 bg-zinc-100 rounded overflow-hidden">
      {userObj ? (
        <>
          <p className="p-4 ">{userObj.username}</p>

          <LogoutBtn setShowAuthMenu={setShowAuthMenu} />
          <DeleteAccountBtn setShowAuthMenu={setShowAuthMenu} />
        </>
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
