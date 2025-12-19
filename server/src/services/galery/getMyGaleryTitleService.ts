import { getMyGaleryTitles } from "../../db/repositories/galery.repository";

export async function getMyGaleryTitleService(username: string) {
  return await getMyGaleryTitles(username);
}
