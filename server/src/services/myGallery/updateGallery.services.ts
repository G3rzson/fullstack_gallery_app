import { updateGalleryTitle } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function updateGalleryService(
  galleryTitleId: string,
  galleryTitle: string,
  isPublic: boolean,
) {
  try {
    return await updateGalleryTitle(galleryTitleId, galleryTitle, isPublic);
  } catch (error) {
    errorHandler(error);
  }
}
