import { Link } from "react-router-dom";

export default function AuthMenu() {
  return (
    <div className="absolute sm:top-8 top-10 sm:right-8 -right-14 w-40 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded  z-50 flex flex-col text-center">
      <Link
        className="p-4 w-full dark:hover:bg-zinc-200 dark:hover:text-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 duration-300"
        to="/auth/login"
      >
        Bejelentkezés
      </Link>
      <Link
        className="p-4 w-full dark:hover:bg-zinc-200 dark:hover:text-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 duration-300"
        to="/auth/register"
      >
        Regisztráció
      </Link>
    </div>
  );
}
