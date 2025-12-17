import { getAllGaleryTitles } from "../../db/repositories/galery.repository";

// get all galery titles
export async function getAllGaleryTitleService() {
  return await getAllGaleryTitles();
}
