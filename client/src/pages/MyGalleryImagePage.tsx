import { Link, useLocation, useSearchParams } from "react-router-dom";
import useProtection from "../hooks/useProtection";
import PageLoader from "../components/PageLoader";
import GetData from "../components/GetData";
import { useGalleryContext } from "../hooks/useGalleryContext";
import DeleteBtn from "../components/DeleteBtn";
import { Trash2 } from "lucide-react";

export default function MyGalleryImagePage() {
  const { isLoading } = useProtection({ type: "protected" });
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

      <Link className="submit-btn mt-4" to={`${pathname}/add`}>
        Kép hozzáadása
      </Link>

      {deletingIdArray && (
        <DeleteBtn id={galleryTitleId!} mode="imageArray">
          Kijelölt elemek törlése <span>{deletingIdArray.length}</span>
          <Trash2 />
        </DeleteBtn>
      )}

      <GetData type="myGalleryImages" />
    </>
  );
}
