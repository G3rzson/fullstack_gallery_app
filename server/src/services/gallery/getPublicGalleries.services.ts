import { getPublicGaleries } from "../../db/dal/galery.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getPublicGalleriesService() {
  try {
    return await getPublicGaleries();
  } catch (error) {
    errorHandler(error);
  }
}
