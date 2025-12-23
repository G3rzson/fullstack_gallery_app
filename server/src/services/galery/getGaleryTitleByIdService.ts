import { findGaleryTitleById } from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";

export async function getGaleryTitleByIdService(id: string, username: string) {
  const galeryObj = await findGaleryTitleById(id);

  if (!galeryObj) {
    throw new NotFoundError("Galéria nem található");
  }

  // Only the owner can fetch by raw ID (used for edit/update forms)
  if (galeryObj.createdBy !== username) {
    throw new NotFoundError("Galéria nem található");
  }

  return galeryObj.toObject();
}
