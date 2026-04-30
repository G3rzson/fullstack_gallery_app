import { Link, useLocation } from "react-router-dom";
import MyGalleryTitleActionMenu from "./MyGalleryTitleActionMenu";
import type { GalleryTitleType } from "../types/types";

export default function MyGalleryTitles({ item }: { item: GalleryTitleType }) {
  const pathname = useLocation().pathname;

  return (
    <li key={item._id} className="gallery-titles group">
      <Link
        className="gallery-title-link"
        to={`${pathname}/${item._id}?title=${item.galeryTitle}`}
      >
        <h3>{item.galeryTitle}</h3>
        <p>{item.isPublic ? "Publikus" : "Privát"}</p>
      </Link>

      <MyGalleryTitleActionMenu
        galleryTitleId={item._id}
        isPublic={item.isPublic}
      />
    </li>
  );
}
