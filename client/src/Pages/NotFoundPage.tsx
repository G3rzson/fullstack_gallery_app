import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-col gap-10 h-full">
      <h1 className="text-3xl">404 | Oldal nem található</h1>
      <Link
        className="duration-300 bg-red-200 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 text-zinc-900 dark:text-zinc-200 p-4 rounded"
        to={"/"}
      >
        Vissza a Főoldalra
      </Link>
    </div>
  );
}
