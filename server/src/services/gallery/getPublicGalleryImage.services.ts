import { getGalleryById } from "../../db/dal/galery.repository";
import { getGalleryImagesByGalleryId } from "../../db/dal/galery.repository";

export async function getPublicGalleryImageService(galleryId: string) {
  const gallery = await getGalleryById(galleryId);
  if (!gallery || !gallery.isPublic) return [];
  return await getGalleryImagesByGalleryId(galleryId);
}
