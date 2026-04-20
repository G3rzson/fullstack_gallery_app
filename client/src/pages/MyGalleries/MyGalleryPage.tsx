import { Link, useParams } from "react-router-dom";

export default function MyGalleryPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="centered-container">
      <Link to={`/my-galleries/${id}/image/add`}>Kép hozzáadása</Link>
      MyGalleryPage - {id}
    </div>
  );
}
