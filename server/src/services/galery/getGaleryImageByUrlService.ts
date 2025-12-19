import {
  findGaleryImagesByUrl,
  findGaleryTitleByUrl,
} from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";

export async function getGaleryImagesService(url: string, username?: string) {
  const galery = await findGaleryTitleByUrl(url);
  if (!galery) {
    throw new NotFoundError("Galéria nem található");
  }

  if (galery.isPrivate && galery.createdBy !== username) {
    // Ne szivárogjon ki, hogy létezik privát galéria
    throw new NotFoundError("Galéria nem található");
  }

  return await findGaleryImagesByUrl(url);
}
