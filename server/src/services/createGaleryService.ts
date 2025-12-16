import { createGaleryTitle } from "../db/repositories/galery.repository";
import { BadRequestError } from "../errors/BadRequestError";
import { createSafeGaleryNames } from "../utils/createSafeGaleryNames";
import { findUniqueSlug } from "../utils/findUniqueSlug";
import fs from "fs/promises";
import path from "path";

export async function createGaleryService(galeryTitle: string) {
  // sanitize and create unique folder name and slug
  const { safeFolderName, safeUrl } = createSafeGaleryNames(galeryTitle);

  // galery folder path
  const galeryFolderPath = path.join("uploads", safeFolderName);

  // find unique slug
  const slug = await findUniqueSlug(safeUrl);

  // create galery folder
  try {
    await fs.mkdir(galeryFolderPath, { recursive: true });
  } catch (err: unknown) {
    const fsError = err as NodeJS.ErrnoException;

    if (fsError.code === "EEXIST") {
      throw new BadRequestError("Galéria már létezik");
    }

    throw err;
  }

  // create galery title in DB
  return await createGaleryTitle({
    galeryTitle,
    path: galeryFolderPath,
    url: slug,
  });
}
