import { getGalleryById } from "../../db/dal/galery.repository";
import { getGalleryImagesByGalleryId } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getPublicGalleryImageService(galleryId: string) {
  try {
    const gallery = await getGalleryById(galleryId);
    if (!gallery || !gallery.isPublic) return [];
    return await getGalleryImagesByGalleryId(galleryId);
  } catch (error) {
    errorHandler(error);
  }
}
