import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

export default function UpdateGalleryTitleLink({
  galleryId,
}: {
  galleryId: string;
}) {
  return (
    <Link
      to={`/my-galleries/title/update/${galleryId}`}
      className="action-btn edit"
    >
      <SquarePen />
    </Link>
  );
}
