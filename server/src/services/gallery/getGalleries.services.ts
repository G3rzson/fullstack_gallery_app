import { getGaleriesByUsername } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getGalleriesService(username: string) {
  try {
    return await getGaleriesByUsername(username);
  } catch (error) {
    errorHandler(error);
  }
}
