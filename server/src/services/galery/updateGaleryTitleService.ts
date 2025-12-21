import path from "path";
import { findGaleryTitleById } from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { createSafeGaleryNames } from "../../utils/createSafeGaleryNames";
import { findUniqueSlug } from "../../utils/findUniqueSlug";
import { renameGaleryFolder } from "../../utils/renameGaleryFolder";
import { updateGaleryImages } from "../../utils/updateGaleryImages";
import { UPLOADS_DIR, resolveFromRepo, toPosixPath } from "../../config/paths";

export async function updateGaleryTitleService(
  galeryId: string,
  newTitle: string,
  isPrivate: boolean,
  username: string
) {
  const galeryObj = await findGaleryTitleById(galeryId);

  if (!galeryObj) {
    throw new NotFoundError("Galéria nem található");
  }

  const titleChanged = newTitle !== galeryObj.galeryTitle;

  if (titleChanged) {
    const { safeGaleryTitleFolder, safeUrl, safeUserFolder } =
      createSafeGaleryNames(newTitle, username);

    const slug = await findUniqueSlug(safeUrl, galeryId);

    const newPath = path.join("uploads", safeUserFolder, safeGaleryTitleFolder);
    const oldAbsolutePath = resolveFromRepo(galeryObj.path);
    const newAbsolutePath = path.join(
      UPLOADS_DIR,
      safeUserFolder,
      safeGaleryTitleFolder
    );

    const oldRelativeDir = toPosixPath(
      path.relative(UPLOADS_DIR, oldAbsolutePath)
    );
    const newRelativeDir = toPosixPath(
      path.relative(UPLOADS_DIR, newAbsolutePath)
    );

    await renameGaleryFolder(oldAbsolutePath, newAbsolutePath);
    await updateGaleryImages(
      galeryObj.url,
      slug,
      oldRelativeDir,
      newRelativeDir
    );

    galeryObj.galeryTitle = newTitle;
    galeryObj.url = slug;
    galeryObj.path = newPath;
  }

  galeryObj.isPrivate = isPrivate;

  const saved = await galeryObj.save();
  return saved.toObject();
}
