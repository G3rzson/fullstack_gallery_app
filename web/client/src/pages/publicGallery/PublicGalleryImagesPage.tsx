import { useSearchParams } from "react-router-dom";
import GetData from "../../components/GetData";

export default function PublicGalleryImagesPage() {
  const [searchParams] = useSearchParams();
  const galleryTitle = searchParams.get("title");

  return (
    <>
      <h1 className="page-title">{galleryTitle || "Galéria képek"}</h1>

      <GetData type="imageData" />
    </>
  );
}
