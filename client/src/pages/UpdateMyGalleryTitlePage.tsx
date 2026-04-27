import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import ServerError from "../components/ServerError";
import { useEffect } from "react";
import GalleryTitleForm from "../components/GalleryTitleForm";
import useMyGalleryTitleGetOne from "../hooks/useMyGalleryTitleGetOne";

export default function UpdateMyGalleryTitlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/my-gallery-titles");
  }, [id, navigate]);

  if (!id) return null;

  const { data, isLoading, isError, error } = useMyGalleryTitleGetOne(id);

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError errorMsg={error?.message} />;

  return <GalleryTitleForm gallery={data} />;
}
