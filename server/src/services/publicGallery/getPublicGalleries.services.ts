import { getFilteredPublicGalleries } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getPublicGalleriesService(search?: string) {
  try {
    return await getFilteredPublicGalleries(search);
  } catch (error) {
    errorHandler(error);
  }
}
