import { createGaleryTitle } from "../../db/dal/galery.repository";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";

export async function createGalleryService(
  gallery: string,
  isPublic: boolean,
  username: string,
) {
  try {
    return await createGaleryTitle({
      galeryTitle: gallery,
      createdBy: username,
      isPublic: isPublic,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new InternalServerError("Galéria létrehozása sikertelen.");
  }
}
