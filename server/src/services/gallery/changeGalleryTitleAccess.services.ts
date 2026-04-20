import { changeGalleryTitleAccess } from "../../db/dal/galery.repository";

export async function changeGalleryTitleAccessService(
  galleryId: string,
  isPublic: boolean,
) {
  try {
    return await changeGalleryTitleAccess(galleryId, !isPublic);
  } catch (error) {
    throw new Error("Failed to change gallery access");
  }
}
