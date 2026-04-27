import { getGalleryImages } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleryImageService(
  createdBy: string,
  galleryId: string,
) {
  try {
    return await getGalleryImages(createdBy, galleryId);
  } catch (error) {
    errorHandler(error);
  }
}
