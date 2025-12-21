import fs from "fs/promises";
import path from "path";
import {
  deleteGaleryImageById,
  findGaleryImageById,
} from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { REPO_ROOT_DIR } from "../../config/paths";

export async function deleteGaleryImageService(imageId: string) {
  const image = await findGaleryImageById(imageId);

  if (!image) {
    throw new NotFoundError("Kép nem található");
  }

  const relativePath = image.url.replace(/^\/+/, "");
  const filePath = path.join(REPO_ROOT_DIR, relativePath);

  try {
    await fs.rm(filePath);
  } catch (err: unknown) {
    const fsErr = err as NodeJS.ErrnoException;

    if (fsErr.code !== "ENOENT") {
      throw err;
    }
  }

  await deleteGaleryImageById(imageId);
}
