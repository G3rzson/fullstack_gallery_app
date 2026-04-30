import { useEffect } from "react";
import GalleryTitleForm from "../components/GalleryTitleForm";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { toast } from "react-hot-toast";

export default function CreateMyGalleryTitlePage() {
  const { userObj, isAuthLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !userObj) {
      toast.error("Kérlek jelentkezz be a saját galériáid megtekintéséhez!");
      setTimeout(() => navigate("/user/login", { replace: true }), 0);
    }
  }, [userObj, isAuthLoading, navigate]);

  if (isAuthLoading || !userObj) {
    return <PageLoader />;
  }

  return <GalleryTitleForm />;
}
