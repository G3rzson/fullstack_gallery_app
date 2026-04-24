import { getGaleriesByUsername } from "../../db/dal/galery.repository";

export async function getGalleriesService(username: string) {
  return await getGaleriesByUsername(username);
}
