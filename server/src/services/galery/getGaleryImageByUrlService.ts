import { findGaleryImagesByUrl } from "../../db/repositories/galery.repository";

export async function getGaleryImagesService(url: string) {
  return await findGaleryImagesByUrl(url);
}
