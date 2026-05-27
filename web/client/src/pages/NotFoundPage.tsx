import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="centered-container gap-8">
      <h1 className="page-title">404 | Oldal nem található</h1>

      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-300/60 dark:bg-rose-800/60 dark:hover:bg-rose-800 hover:bg-rose-300 border-2 border-rose-600 dark:border-rose-400 transition-colors shadow-md duration-300"
      >
        <ArrowBigLeft /> Vissza a főoldalra
      </Link>
    </div>
  );
}
