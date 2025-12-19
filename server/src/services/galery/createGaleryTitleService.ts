import fs from "fs/promises";
import path from "path";
import { createSafeGaleryNames } from "../../utils/createSafeGaleryNames";
import { findUniqueSlug } from "../../utils/findUniqueSlug";
import { createGaleryTitle } from "../../db/repositories/galery.repository";

export async function createGaleryTitleService(
  galeryTitle: string,
  isPrivate: boolean,
  username: string
) {
  const { safeFolderName, safeUrl } = createSafeGaleryNames(galeryTitle);
  const slug = await findUniqueSlug(safeUrl);
  const galeryFolderPath = path.join("uploads", safeFolderName);

  await fs.mkdir(galeryFolderPath, { recursive: true });

  return await createGaleryTitle({
    galeryTitle,
    path: galeryFolderPath,
    url: slug,
    createdBy: username,
    isPrivate,
  });
}
