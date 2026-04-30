import { getGalleryImagesByGalleryId } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getAllGalleryImagesByIdService(galleryTitleId: string) {
  try {
    return await getGalleryImagesByGalleryId(galleryTitleId);
  } catch (error) {
    errorHandler(error);
  }
}
