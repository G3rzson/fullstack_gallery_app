import { Link } from "react-router-dom";
import "../gallery.css";
import { useState, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import { useOutsideClick } from "../../../shared/hooks/useOutsideClick";
import { useEscapeKey } from "../../../shared/hooks/useEscapeKey";
import type { GalleryTitleType } from "../../../types/types";
import ChangeGalleryTitleAccessBtn from "./ChangeGalleryTitleAccessBtn";
import DeleteGalleryTitleBtn from "./DeleteGalleryTitleBtn";
import UpdateGalleryTitleLink from "./UpdateGalleryTitleLink";

export default function MyGalleriesItems({
  gallery,
}: {
  gallery: GalleryTitleType;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function onCloseDropdown() {
    setIsDropdownOpen(false);
  }

  function onToggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useOutsideClick(dropdownRef, onCloseDropdown, isDropdownOpen);
  useEscapeKey(onCloseDropdown, isDropdownOpen);

  return (
    <li className="gallery-item">
      <Link to={`/my-galleries/${gallery._id}`} className="gallery-link">
        <h3>{gallery.gallery}</h3>
        <p>{gallery.isPublic ? "Publikus" : "Privát"}</p>
      </Link>
      <div ref={dropdownRef}>
        <button
          className={`dropdown-menu-button ${isDropdownOpen ? "open" : ""}`}
          title="Menü"
          onClick={onToggleDropdown}
        >
          <EllipsisVertical />
        </button>

        <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
          <DeleteGalleryTitleBtn galleryId={gallery._id} />

          <UpdateGalleryTitleLink galleryId={gallery._id} />

          <ChangeGalleryTitleAccessBtn
            galleryId={gallery._id}
            isPublic={gallery.isPublic}
          />
        </div>
      </div>
    </li>
  );
}
