import GalleryTitleForm from "../../components/GalleryTitleForm";

import PageLoader from "../../components/PageLoader";
import useProtection from "../../hooks/useProtection";

export default function MyGalleryTitleCreatePage() {
  const { isLoading } = useProtection({ type: "protected" });

  if (isLoading) {
    return <PageLoader />;
  }

  return <GalleryTitleForm />;
}
