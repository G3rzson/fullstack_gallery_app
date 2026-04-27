import { createGaleryTitle } from "../../db/dal/galery.repository";
import { GaleryTitleSchemaType } from "../../db/models/galeryTitle.model";
import { errorHandler } from "../../functions/errorHandler";

export async function createGalleryService(
  newGalleryTitle: GaleryTitleSchemaType,
) {
  try {
    return await createGaleryTitle(newGalleryTitle);
  } catch (error) {
    errorHandler(error);
  }
}
