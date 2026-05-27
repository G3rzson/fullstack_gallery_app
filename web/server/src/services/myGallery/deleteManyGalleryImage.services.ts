import {
  getGalleryImageById,
  deleteGalleryImage,
} from "../../db/dal/gallery.repository";
import cloudinary from "../../functions/cloudinary";
import { errorHandler } from "../../functions/errorHandler";

export async function deleteManyGalleryImageService(ids: string[]) {
  try {
    for (const imageId of ids) {
      const image = await getGalleryImageById(imageId);
      await deleteGalleryImage(imageId);
      if (image && image.publicId) {
        await cloudinary.uploader.destroy(image.publicId, {
          resource_type: "image",
        });
      }
    }
  } catch (error) {
    console.error("Hiba a képek törlése során:", error);
    errorHandler(error);
  }
}
