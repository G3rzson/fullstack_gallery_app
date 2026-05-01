import { getFilteredGalleryTitlesByUserId } from "../../db/dal/gallery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleryTitlesByUserIdService(
  userId: string,
  search?: string,
) {
  try {
    return await getFilteredGalleryTitlesByUserId(userId, search);
  } catch (error) {
    errorHandler(error);
  }
}
