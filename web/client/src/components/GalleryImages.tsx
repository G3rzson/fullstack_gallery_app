import { Trash2 } from "lucide-react";
import { useGalleryContext } from "../hooks/useGalleryContext";
import { useModalContext } from "../hooks/useModalContext";
import type { GalleryImageType } from "../types/types";
import DeleteBtn from "./DeleteBtn";
import GalleryImageCheckbox from "./GalleryImageCheckbox";
import { getGalleryStatus } from "../functions/getGalleryStatus";
import { useLocation } from "react-router-dom";

export default function GalleryImages({ item }: { item: GalleryImageType }) {
  const { setIsModalOpen } = useModalContext();
  const { setGalleryImageObj } = useGalleryContext();
  const { deletingIdArray } = useGalleryContext();
  const pathname = useLocation().pathname;
  const galleryStatus = getGalleryStatus(pathname);

  return (
    <li className="w-full h-50 border-2 border-pink-800 dark:border-pink-200 group relative rounded-lg overflow-hidden">
      <img
        src={item.publicUrl}
        alt={item.originalName}
        className="w-full h-full object-cover cursor-zoom-in"
        loading="lazy"
        onClick={() => {
          setGalleryImageObj(item);
          setIsModalOpen(true);
        }}
      />

      <span
        className={`pointer-events-none absolute top-0 left-0 h-full w-full dark:bg-pink-900/40 bg-pink-300/40 ${deletingIdArray.includes(item._id) ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
      />

      {galleryStatus !== "public" && (
        <div className="absolute bottom-0 right-0 flex items-center justify-between gap-2 p-2 bg-black/50 w-full sm:opacity-0 opacity-100 group-hover:opacity-100 transition-all duration-300">
          <DeleteBtn id={item._id} mode="image">
            <Trash2 />
          </DeleteBtn>

          <GalleryImageCheckbox galleryImageId={item._id} />
        </div>
      )}
    </li>
  );
}
