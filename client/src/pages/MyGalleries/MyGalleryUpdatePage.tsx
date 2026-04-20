import { useParams } from "react-router-dom";
import GalleryTitleForm from "./components/GalleryTitleForm";
import useGalleryTitleGetOne from "./hooks/useGalleryTitleGetOne";

export default function MyGalleryUpdatePage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  const { data, isLoading, error } = useGalleryTitleGetOne(id);

  if (isLoading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba az adatok betöltésekor</p>;

  return <GalleryTitleForm gallery={data?.data} />;
}
