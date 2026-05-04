import { useLocation } from "react-router-dom";
import PageLoader from "../../components/PageLoader";
import ServerError from "../../components/ServerError";
import GalleryTitleForm from "../../components/GalleryTitleForm";
import useMyGalleryTitleGetOne from "../../hooks/useMyGalleryTitleGetOne";
import useProtection from "../../hooks/useProtection";

export default function MyGalleryTitleUpdatePage() {
  const pathname = useLocation().pathname;

  const protectionLoading = useProtection({ type: "protected" });

  if (protectionLoading.isLoading) {
    return <PageLoader />;
  }

  const { data, isLoading, isError, error } = useMyGalleryTitleGetOne(pathname);

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError error={error} />;

  return <GalleryTitleForm gallery={data} />;
}
