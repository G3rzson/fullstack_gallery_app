import useProtection from "../../hooks/useProtection";
import PageLoader from "../../components/PageLoader";
import GetData from "../../components/GetData";
import DeleteBtn from "../../components/DeleteBtn";
import { Trash2 } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGalleryContext } from "../../hooks/useGalleryContext";

export default function AdminGalleryImagePage() {
  const { isLoading } = useProtection({ type: "admin" });
  const pathname = useLocation().pathname;

  const [searchParams] = useSearchParams();
  const galleryTitle = searchParams.get("title");
  const { deletingIdArray } = useGalleryContext();

  const galleryTitleId = pathname.split("/").pop();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      {deletingIdArray && (
        <DeleteBtn id={galleryTitleId!} mode="imageArray">
          Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
          <Trash2 />
        </DeleteBtn>
      )}

      <GetData type="imageData" />
    </>
  );
}
