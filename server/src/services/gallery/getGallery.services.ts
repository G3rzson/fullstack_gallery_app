import { getGalleryById } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

// mi ez torolni ?
export async function getGalleryService(galleryTitleId: string) {
  try {
    return await getGalleryById(galleryTitleId);
  } catch (error) {
    errorHandler(error);
  }
}
