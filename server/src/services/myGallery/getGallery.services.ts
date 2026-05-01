import { getGalleryTitleById } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleryService(galleryTitleId: string) {
  try {
    return await getGalleryTitleById(galleryTitleId);
  } catch (error) {
    errorHandler(error);
  }
}
