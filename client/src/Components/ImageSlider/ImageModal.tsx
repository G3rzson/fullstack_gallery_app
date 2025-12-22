import type { GaleryImageType } from "../../Types/types";

type Props = {
  onClose: () => void;
  imageObj: GaleryImageType;
};

export default function ImageModal({ onClose, imageObj }: Props) {
  return (
    <div
      className="fixed inset-0 dark:bg-zinc-900 bg-zinc-200 flex items-center justify-center z-50 cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={`http://localhost:8000${imageObj.url}`}
        alt={imageObj.filename}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}
