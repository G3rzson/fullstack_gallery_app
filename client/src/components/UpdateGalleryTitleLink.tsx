import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

export default function UpdateGalleryTitleLink({
  galleryTitleId,
}: {
  galleryTitleId: string;
}) {
  return (
    <Link
      to={`/my-gallery-titles/update/${galleryTitleId}`}
      className="action-btn"
    >
      <SquarePen />
    </Link>
  );
}
