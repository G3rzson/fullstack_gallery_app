import { changeGalleryTitleAccess } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function changeGalleryTitleAccessService(
  galleryTitleId: string,
  isPublic: boolean,
) {
  try {
    return await changeGalleryTitleAccess(galleryTitleId, !isPublic);
  } catch (error) {
    errorHandler(error);
  }
}
