import path from "path";
import sanitize from "sanitize-filename";
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

  const safeUserFolder = sanitize(galery.createdBy) || "user";
  const newPath = path.join("uploads", safeUserFolder, safeFolderName);

  const oldRelativeDir = path
    .relative("uploads", galery.path)
    .split(path.sep)
    .join("/");
  const newRelativeDir = path
    .relative("uploads", newPath)
    .split(path.sep)
    .join("/");

  await renameGaleryFolder(galery.path, newPath);
  await updateGaleryImages(galery.url, slug, oldRelativeDir, newRelativeDir);

  galery.galeryTitle = newTitle;
  galery.url = slug;
  galery.path = newPath;

  await galery.save();

  return galery.toObject();
}
