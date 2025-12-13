import { Link } from "react-router-dom";

export default function NotLoggedInUser() {
  return (
    <div className="absolute text-center bottom-12 w-full shadow-lg dark:bg-zinc-800 bg-zinc-100 rounded overflow-hidden">
      <Link className="block p-4 duration-300" to="/auth/login">
        Bejelentkezés
      </Link>
      <Link className="block p-4 duration-300" to="/auth/register">
        Regisztráció
      </Link>
    </div>
  );
}
