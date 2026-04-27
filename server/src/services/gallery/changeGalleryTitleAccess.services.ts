import { changeGalleryTitleAccess } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function changeGalleryTitleAccessService(
  galleryId: string,
  isPublic: boolean,
) {
  try {
    return await changeGalleryTitleAccess(galleryId, !isPublic);
  } catch (error) {
    errorHandler(error);
  }
}
