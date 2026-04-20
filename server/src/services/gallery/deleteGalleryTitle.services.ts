import { deleteGalleryTitle } from "../../db/dal/galery.repository";

export async function deleteGalleryTitleService(galleryId: string) {
  try {
    return await deleteGalleryTitle(galleryId);
  } catch (error) {
    throw new Error("Failed to delete gallery");
  }
}
