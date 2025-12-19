import { getAllGaleryTitles } from "../../db/repositories/galery.repository";

export async function getAllGaleryTitleService() {
  return await getAllGaleryTitles();
}
