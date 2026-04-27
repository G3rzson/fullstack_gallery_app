import { getGalleryById } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleryService(galleryId: string) {
  try {
    return await getGalleryById(galleryId);
  } catch (error) {
    errorHandler(error);
  }
}
