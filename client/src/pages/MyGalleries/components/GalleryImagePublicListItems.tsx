import { useState } from "react";
import type { GalleryImageType } from "../../../types/types";
import Modal from "../../../shared/components/Modal/Modal";
import "../../../shared/components/Modal/modal.css";

type Props = {
  galleryImage: GalleryImageType;
};

export default function GalleryImagePublicListItems({ galleryImage }: Props) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  function handleImageClick() {
    setIsImageModalOpen(true);
  }

  return (
    <>
      <li key={galleryImage._id} className="card">
        <img
          src={galleryImage.publicUrl}
          alt={galleryImage.originalName}
          className="gallery-image"
          onClick={handleImageClick}
        />
      </li>

      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      >
        <img
          src={galleryImage.publicUrl}
          alt={galleryImage.originalName}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            width: "auto",
            height: "auto",
            borderRadius: "8px",
            objectFit: "contain",
          }}
        />
      </Modal>
    </>
  );
}
