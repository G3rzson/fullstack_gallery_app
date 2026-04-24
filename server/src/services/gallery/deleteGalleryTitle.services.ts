import {
  deleteGalleryTitle,
  getGalleryImagesByGalleryId,
  deleteGalleryImage,
} from "../../db/dal/galery.repository";
import cloudinary from "../../functions/cloudinary";

export async function deleteGalleryTitleService(galleryId: string) {
  try {
    // 1. Lekérjük az összes képet ehhez a galériához
    const images = await getGalleryImagesByGalleryId(galleryId);

    // 2. Töröljük a képeket az adatbázisból és a Cloudinary-ből
    for (const image of images) {
      await deleteGalleryImage(image._id);
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId, {
          resource_type: "image",
        });
      }
    }

    // 3. Töröljük a galéria címet
    return await deleteGalleryTitle(galleryId);
  } catch (error) {
    throw new Error("Failed to delete gallery");
  }
}
