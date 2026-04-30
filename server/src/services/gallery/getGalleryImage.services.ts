import { getGalleryImages } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleryImageService(galleryTitleId: string) {
  try {
    return await getGalleryImages(galleryTitleId);
  } catch (error) {
    errorHandler(error);
  }
}
