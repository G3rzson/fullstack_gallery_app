import { Square, SquareCheck } from "lucide-react";
import { useGalleryContext } from "../hooks/useGalleryContext";

export default function GalleryImageCheckbox({
  galleryImageId,
}: {
  galleryImageId: string;
}) {
  const { deletingIdArray, setDeletingIdArray } = useGalleryContext();

  function handleCheck() {
    console.log("checkbox clicked, id:", galleryImageId);
    console.log(deletingIdArray);

    setDeletingIdArray((prev) => {
      if (prev.includes(galleryImageId)) {
        return prev.filter((id) => id !== galleryImageId);
      } else {
        return [...prev, galleryImageId];
      }
    });
  }

  return (
    <button className="check-btn" disabled={false} onClick={handleCheck}>
      {deletingIdArray.includes(galleryImageId) ? <SquareCheck /> : <Square />}
    </button>
  );
}
