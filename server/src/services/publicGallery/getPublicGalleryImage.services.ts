import { getGalleryTitleById } from "../../db/dal/gallery.repository";
import { getGalleryImagesByGalleryId } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getPublicGalleryImageService(galleryTitleId: string) {
  try {
    const gallery = await getGalleryTitleById(galleryTitleId);
    if (!gallery || !gallery.isPublic) return [];
    return await getGalleryImagesByGalleryId(galleryTitleId);
  } catch (error) {
    errorHandler(error);
  }
}
