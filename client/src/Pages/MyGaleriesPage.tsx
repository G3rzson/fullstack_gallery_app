import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContextProvider } from "../Hooks/useContextProvider";
import toast from "react-hot-toast";
import Loader from "../Components/GlobalComponents/Loader";
import GaleryLinkArray from "../Components/GlobalComponents/GaleryLinkArray";

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
        to="/galery-title"
        className="dark:hover:bg-zinc-700 text-center dark:bg-zinc-900 rounded bg-zinc-200 hover:bg-zinc-300 w-full py-2 duration-300 cursor-pointer"
      >
        Galéria létrehozása
      </Link>

      <GaleryLinkArray mode="private" />
    </div>
  );
}
