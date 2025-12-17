import path from "path";
import { findGaleryTitleById } from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { createSafeGaleryNames } from "../../utils/createSafeGaleryNames";
import { findUniqueSlug } from "../../utils/findUniqueSlug";
import { renameGaleryFolder } from "../../utils/renameGaleryFolder";
import { updateGaleryImages } from "../../utils/updateGaleryImages";

// rename galery folder
export async function updateGaleryTitleService(
  galeryId: string,
  newTitle: string
) {
  const galery = await findGaleryTitleById(galeryId);
  if (!galery) {
    throw new NotFoundError("Galéria nem található");
  }

  const { safeFolderName, safeUrl } = createSafeGaleryNames(newTitle);
  const slug = await findUniqueSlug(safeUrl, galeryId);

  const newPath = path.join("uploads", safeFolderName);

  await renameGaleryFolder(galery.path, newPath);
  await updateGaleryImages(galery.url, slug, safeFolderName);

  galery.galeryTitle = newTitle;
  galery.url = slug;
  galery.path = newPath;

  await galery.save();

  return galery.toObject();
}
