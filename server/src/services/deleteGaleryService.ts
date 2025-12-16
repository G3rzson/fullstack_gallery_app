import {
  deleteGaleryImagesByUrl,
  deleteGaleryTitleById,
  findGaleryTitleById,
} from "../db/repositories/galery.repository";
import { NotFoundError } from "../errors/NotFoundError";
import fs from "fs/promises";

// delete galery by ID
export async function deleteGaleryService(galeryTitleId: string) {
  const galery = await findGaleryTitleById(galeryTitleId);

  if (!galery) {
    throw new NotFoundError("Galéria nem található");
  }

  // Mappa törlése
  try {
    await fs.rm(galery.path, { recursive: true, force: true });
  } catch (err: unknown) {
    const fsErr = err as NodeJS.ErrnoException;

    if (fsErr.code !== "ENOENT") {
      throw err;
    }
  }

  await Promise.all([
    deleteGaleryTitleById(galeryTitleId),
    deleteGaleryImagesByUrl(galery.url),
  ]);
}
