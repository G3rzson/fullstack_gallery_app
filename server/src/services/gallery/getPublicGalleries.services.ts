import { getPublicGaleries } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getPublicGalleriesService(search?: string) {
  try {
    // Ha van keresési kifejezés, szűrés
    let filter: Record<string, any> = { isPublic: true };
    if (search) {
      filter = {
        ...filter,
        galeryTitle: { $regex: search, $options: "i" }, // case-insensitive keresés
      };
    }
    return await getPublicGaleries(filter);
  } catch (error) {
    errorHandler(error);
  }
}
