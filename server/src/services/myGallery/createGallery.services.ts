import { createGalleryTitle } from "../../db/dal/gallery.repository";
import { GalleryTitleSchemaType } from "../../db/models/galleryTitle.model";
import { errorHandler } from "../../functions/errorHandler";

export async function createGalleryService(
  newGalleryTitle: GalleryTitleSchemaType,
) {
  try {
    return await createGalleryTitle(newGalleryTitle);
  } catch (error) {
    errorHandler(error);
  }
}
