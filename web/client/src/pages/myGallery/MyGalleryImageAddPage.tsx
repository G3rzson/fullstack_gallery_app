import PageLoader from "../../components/PageLoader";
import useProtection from "../../hooks/useProtection";
import GalleryImageForm from "../../components/GalleryImageForm";

export default function MyGalleryImageAddPage() {
  const { isLoading } = useProtection({ type: "protected" });

  if (isLoading) {
    return <PageLoader />;
  }

  return <GalleryImageForm />;
}
