import { getFilteredGalleryTitles } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleriesService(username: string, search?: string) {
  try {
    // Ha van keresési kifejezés, szűrés
    let filter: Record<string, any> = { createdBy: username };
    if (search) {
      filter = {
        ...filter,
        galeryTitle: { $regex: search, $options: "i" }, // case-insensitive keresés
      };
    }
    return await getFilteredGalleryTitles(filter);
  } catch (error) {
    console.error("Error in getGalleriesService:", error);
    errorHandler(error);
  }
}
