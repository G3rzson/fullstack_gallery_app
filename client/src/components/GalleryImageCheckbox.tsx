import { Square, SquareCheck } from "lucide-react";
import { useGalleryContext } from "../hooks/useGalleryContext";

export default function GalleryImageCheckbox({
  galleryImageId,
}: {
  galleryImageId: string;
}) {
  const { deletingIdArray, setDeletingIdArray } = useGalleryContext();

  function handleCheck() {
    setDeletingIdArray((prev) => {
      if (prev.includes(galleryImageId)) {
        return prev.filter((id) => id !== galleryImageId);
      } else {
        return [...prev, galleryImageId];
      }
    });
  }

  return (
    <button
      className="text-green-400! cursor-pointer"
      title={
        deletingIdArray.includes(galleryImageId)
          ? "Kijelölés visszavonása"
          : "Kijelölés"
      }
      disabled={false}
      onClick={handleCheck}
    >
      {deletingIdArray.includes(galleryImageId) ? <SquareCheck /> : <Square />}
    </button>
  );
}
