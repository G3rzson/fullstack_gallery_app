import { Link, useLocation } from "react-router-dom";
import MyGalleryTitleActionMenu from "./MyGalleryTitleActionMenu";
import type { GalleryTitleType } from "../types/types";
import { getGalleryStatus } from "../functions/getGalleryStatus";

export default function GalleryTitles({ item }: { item: GalleryTitleType }) {
  const pathname = useLocation().pathname;
  const galleryStatus = getGalleryStatus(pathname);

  return (
    <li key={item._id} className="gallery-titles group">
      <Link
        className="gallery-title-link"
        to={`${pathname}/${item._id}?title=${item.galleryTitle}`}
      >
        <h3>{item.galleryTitle}</h3>

        {galleryStatus !== "public" && (
          <p>{item.isPublic ? "Publikus" : "Privát"}</p>
        )}
      </Link>

      {galleryStatus !== "public" && (
        <MyGalleryTitleActionMenu
          galleryTitleId={item._id}
          isPublic={item.isPublic}
        />
      )}
    </li>
  );
}
