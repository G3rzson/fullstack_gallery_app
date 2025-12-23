import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContextProvider } from "../Hooks/useContextProvider";
import toast from "react-hot-toast";
import Loader from "../Components/GlobalComponents/Loader";
import GaleryLinkArray from "../Components/GaleryTitles/GaleryLinkArray";

export default function MyGaleries() {
  const { userObj, isAuthLoading } = useContextProvider();

  useEffect(() => {
    if (!userObj && !isAuthLoading) {
      toast.error("A galériák kezeléséhez jelentkezz be!");
    }
  }, [userObj, isAuthLoading]);

  if (isAuthLoading) return <Loader />;

  if (!userObj) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-3xl text-center">Galériák kezelése</h1>
      <Link
        to="/galery-title/create"
        className="text-center rounded bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 w-full py-2 duration-300 cursor-pointer"
      >
        Galéria létrehozása
      </Link>

      <GaleryLinkArray mode="private" />
    </div>
  );
}
