import { SquarePen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function UpdateGalleryTitleLink({
  galleryTitleId,
}: {
  galleryTitleId: string;
}) {
  const pathname = useLocation().pathname;
  return (
    <Link to={`${pathname}/update/${galleryTitleId}`} className="action-btn">
      <SquarePen />
    </Link>
  );
}
