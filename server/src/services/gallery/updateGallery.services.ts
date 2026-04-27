import { updateGalleryTitle } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function updateGalleryService(
  galleryId: string,
  galleryTitle: string,
  isPublic: boolean,
) {
  try {
    return await updateGalleryTitle(galleryId, galleryTitle, isPublic);
  } catch (error) {
    errorHandler(error);
  }
}
