import { getPublicGaleries } from "../../db/dal/galery.repository";

export async function getPublicGalleriesService() {
  return await getPublicGaleries();
}
