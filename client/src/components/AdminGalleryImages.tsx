import { useGalleryContext } from "../hooks/useGalleryContext";
import { useModalContext } from "../hooks/useModalContext";
import type { GalleryImageType } from "../types/types";

export default function AdminGalleryImages({
  item,
}: {
  item: GalleryImageType;
}) {
  const { setIsModalOpen } = useModalContext();
  const { setGalleryImageObj } = useGalleryContext();

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
    </li>
  );
}
