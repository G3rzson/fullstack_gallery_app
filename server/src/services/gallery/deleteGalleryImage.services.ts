import {
  deleteGalleryImage,
  getGalleryImageById,
} from "../../db/dal/galery.repository";
import cloudinary from "../../functions/cloudinary";

export async function deleteGalleryImageService(imageId: string) {
  try {
    const image = await getGalleryImageById(imageId);
    const dbResult = await deleteGalleryImage(imageId);
    if (image && image.publicId) {
      await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
      });
    }
    return dbResult;
  } catch (error) {
    throw new Error("Failed to delete image");
  }
}
