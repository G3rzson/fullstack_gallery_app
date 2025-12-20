import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import GaleryTitleForm from "../Components/MyGaleriesPageComp/GaleryTitleForm";
import PrivateGaleryLinkArray from "../Components/MyGaleriesPageComp/PrivateGaleryLinkArray";
import { useContextProvider } from "../Hooks/useContextProvider";
import toast from "react-hot-toast";
import Loader from "../Components/GlobalComponents/Loader";

export default function MyGaleries() {
  const { user, isAuthLoading } = useContextProvider();

  useEffect(() => {
    if (!user && !isAuthLoading) {
      toast.error("A galériák kezeléséhez jelentkezz be!");
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) return <Loader />;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-4 p-4">
      <h1 className="text-3xl">Galériák kezelése</h1>
      <GaleryTitleForm />
      <div className="flex flex-1 items-center justify-center">
        <PrivateGaleryLinkArray />
      </div>
    </div>
  );
}
