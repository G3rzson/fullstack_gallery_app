import { useParams } from "react-router-dom";

export default function GalleryPage() {
  const { id } = useParams<{ id: string }>();

  return <div className="centered-container">GalleryPage - {id}</div>;
}
