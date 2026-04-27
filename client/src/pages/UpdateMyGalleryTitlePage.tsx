import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import ServerError from "../components/ServerError";
import { useEffect } from "react";
import GalleryTitleForm from "../components/GalleryTitleForm";
import useMyGalleryTitleGetOne from "../hooks/useMyGalleryTitleGetOne";
import { useUserContext } from "../hooks/useUserContext";
import { toast } from "react-hot-toast/headless";

export default function UpdateMyGalleryTitlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userObj, isAuthLoading } = useUserContext();

  useEffect(() => {
    if (!isAuthLoading && !userObj) {
      toast.error("Kérlek jelentkezz be a saját galériáid megtekintéséhez!");
      setTimeout(() => navigate("/user/login", { replace: true }), 0);
    }
  }, [userObj, isAuthLoading, navigate]);

  useEffect(() => {
    if (!id) navigate("/my-gallery-titles");
  }, [id, navigate]);

  if (!id) return null;

  const { data, isLoading, isError, error } = useMyGalleryTitleGetOne(id);

  if (isAuthLoading || !userObj) {
    return <PageLoader />;
  }

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  return <GalleryTitleForm gallery={data} />;
}
