import { getGalleryImages } from "../../db/dal/galery.repository";

export async function getGalleryImageService(
  createdBy: string,
  galleryId: string,
) {
  return await getGalleryImages(createdBy, galleryId);
}
