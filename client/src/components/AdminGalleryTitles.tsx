import { Link, useLocation } from "react-router-dom";
import type { GalleryTitleType } from "../types/types";

export default function AdminGalleryTitles({
  item,
}: {
  item: GalleryTitleType;
}) {
  const pathname = useLocation().pathname;

  return (
    <li className="gallery-titles">
      <Link className="gallery-title-link" to={`${pathname}/${item._id}`}>
        <h3>{item.galeryTitle}</h3>
        <p>{item.isPublic ? "Publikus" : "Privát"}</p>
      </Link>
    </li>
  );
}
