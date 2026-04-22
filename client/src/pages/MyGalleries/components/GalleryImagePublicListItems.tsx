import type { GalleryImageType } from "../../../types/types";

/* todo - kép menyitása modal-ban */
/* todo - az action btn-okat animálni és egy div-be rakni transparent hattérel hover-re*/

type Props = {
  galleryImage: GalleryImageType;
};

export default function GalleryImagePublicListItems({ galleryImage }: Props) {
  return (
    <li key={galleryImage._id} className="card">
      <img
        src={galleryImage.publicUrl}
        alt={galleryImage.originalName}
        className="gallery-image"
      />
    </li>
  );
}
