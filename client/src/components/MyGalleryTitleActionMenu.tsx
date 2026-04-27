import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { EllipsisVertical, Trash2 } from "lucide-react";
import UpdateGalleryTitleLink from "./UpdateGalleryTitleLink";
import DeleteBtn from "./DeleteBtn";
import ChangeGalleryTitleAccessBtn from "./ChangeGalleryTitleAccessBtn";

export default function MyGalleryTitleActionMenu({
  galleryTitleId,
  isPublic,
}: {
  galleryTitleId: string;
  isPublic: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false), isDropdownOpen);

  useEscapeKey(() => setIsDropdownOpen(false), isDropdownOpen);

  return (
    <div ref={dropdownRef}>
      <button
        className={
          `absolute top-1 right-1 p-0.5 rounded-full cursor-pointer hover:bg-pink-300 dark:hover:bg-pink-900 transition-colors duration-300 ` +
          `opacity-100 md:opacity-0 md:group-hover:opacity-100`
        }
        title="Menü"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <EllipsisVertical />
      </button>

      <div
        className={`absolute top-9 right-1 dark:bg-fuchsia-950 bg-fuchsia-300 border-2 dark:border-fuchsia-700 border-fuchsia-500 rounded-lg p-2 flex flex-col gap-2 transition-opacity w-fit duration-300 z-10 ${isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <DeleteBtn id={galleryTitleId} mode="title">
          <Trash2 />
        </DeleteBtn>

        <UpdateGalleryTitleLink galleryTitleId={galleryTitleId} />

        <ChangeGalleryTitleAccessBtn
          galleryTitleId={galleryTitleId}
          isPublic={isPublic}
        />
      </div>
    </div>
  );
}
