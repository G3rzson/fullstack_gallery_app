import {
  deleteGalleryTitle,
  getGalleryImagesByGalleryId,
  deleteGalleryImage,
} from "../../db/dal/galery.repository";
import cloudinary from "../../functions/cloudinary";
import { errorHandler } from "../../functions/errorHandler";

export async function deleteGalleryTitleService(galleryId: string) {
  try {
    const images = await getGalleryImagesByGalleryId(galleryId);

    // Töröljük a képeket az adatbázisból és a Cloudinary-ből
    for (const image of images) {
      await deleteGalleryImage(image._id.toString());
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId, {
          resource_type: "image",
        });
      }
    }

    // Töröljük a galéria címet
    return await deleteGalleryTitle(galleryId);
  } catch (error) {
    errorHandler(error);
  }
}
