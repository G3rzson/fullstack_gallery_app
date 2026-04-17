import { useParams } from "react-router-dom";

export default function MyGalleryPage() {
  const { id } = useParams<{ id: string }>();

  return <div className="centered-container">MyGalleryPage - {id}</div>;
}
