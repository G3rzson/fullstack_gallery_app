import { getFilteredGalleryTitles } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getAllGalleryTitlesByIdService(
  userId: string,
  search?: string,
) {
  try {
    let filter: Record<string, any> = { userId: userId };
    if (search) {
      filter = {
        ...filter,
        galeryTitle: { $regex: search, $options: "i" }, // case-insensitive keresés
      };
    }
    return await getFilteredGalleryTitles(filter);
  } catch (error) {
    errorHandler(error);
  }
}
