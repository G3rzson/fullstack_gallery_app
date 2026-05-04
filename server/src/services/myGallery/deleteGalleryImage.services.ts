import {
  deleteGalleryImage,
  getGalleryImageById,
} from "../../db/dal/gallery.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import cloudinary from "../../functions/cloudinary";
import { errorHandler } from "../../functions/errorHandler";

export async function deleteGalleryImageService(imageId: string) {
  try {
    const image = await getGalleryImageById(imageId);
    if (!image) {
      throw new NotFoundError("Kép nem található.");
    }
    const dbResult = await deleteGalleryImage(imageId);
    if (image && image.publicId) {
      await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
      });
    }
    return dbResult;
  } catch (error) {
    errorHandler(error);
  }
}
