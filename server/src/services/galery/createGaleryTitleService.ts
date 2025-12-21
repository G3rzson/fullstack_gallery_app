import fs from "fs/promises";
import path from "path";
import { createSafeGaleryNames } from "../../utils/createSafeGaleryNames";
import { findUniqueSlug } from "../../utils/findUniqueSlug";
import { createGaleryTitle } from "../../db/repositories/galery.repository";
import { UPLOADS_DIR } from "../../config/paths";

export async function createGaleryTitleService(
  galeryTitle: string,
  isPrivate: boolean,
  username: string
) {
  const { safeGaleryTitleFolder, safeUrl, safeUserFolder } =
    createSafeGaleryNames(galeryTitle, username);

  const slug = await findUniqueSlug(safeUrl);

  const galeryFolderRelativePath = path.join(
    "uploads",
    safeUserFolder,
    safeGaleryTitleFolder
  );
  const galeryFolderAbsolutePath = path.join(
    UPLOADS_DIR,
    safeUserFolder,
    safeGaleryTitleFolder
  );

  await fs.mkdir(galeryFolderAbsolutePath, { recursive: true });

  return await createGaleryTitle({
    galeryTitle,
    path: galeryFolderRelativePath,
    url: slug,
    createdBy: username,
    isPrivate,
  });
}
