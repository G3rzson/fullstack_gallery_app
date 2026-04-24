import { updateGalleryTitle } from "../../db/dal/galery.repository";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";

export async function updateGalleryService(
  galleryId: string,
  gallery: string,
  isPublic: boolean,
) {
  try {
    return await updateGalleryTitle(galleryId, gallery, isPublic);
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new InternalServerError("Galéria frissítése sikertelen.");
  }
}
