import {
  getGalleryImageById,
  deleteGalleryImage,
} from "../../db/dal/galery.repository";
import cloudinary from "../../functions/cloudinary";

export async function deleteManyGalleryImageService(ids: string[]) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Nincs megadva törlendő kép.");
  }

  for (const imageId of ids) {
    const image = await getGalleryImageById(imageId);
    await deleteGalleryImage(imageId);
    if (image && image.publicId) {
      await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
      });
    }
  }
}
