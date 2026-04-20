import { getGalleryById } from "../../db/dal/galery.repository";

export async function getGalleryService(galleryId: string) {
  return await getGalleryById(galleryId);
}
