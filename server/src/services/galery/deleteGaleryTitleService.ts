import fs from "fs/promises";
import path from "path";
import {
  deleteGaleryImagesByUrl,
  deleteGaleryTitleById,
  findGaleryTitleById,
} from "../../db/repositories/galery.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { UPLOADS_DIR, resolveFromRepo } from "../../config/paths";

async function pruneEmptyDirsUpTo(startDir: string, stopDir: string) {
  const resolvedStop = path.resolve(stopDir);
  let current = path.resolve(startDir);

  while (current.startsWith(resolvedStop) && current !== resolvedStop) {
    try {
      const entries = await fs.readdir(current);
      if (entries.length > 0) return;

      await fs.rm(current, { recursive: true, force: true });
      current = path.dirname(current);
    } catch (err: unknown) {
      const fsErr = err as NodeJS.ErrnoException;

      // If directory doesn't exist or isn't empty, stop pruning.
      if (fsErr.code === "ENOENT" || fsErr.code === "ENOTEMPTY") return;
      return;
    }
  }
}

export async function deleteGaleryTitleService(galeryTitleId: string) {
  const galery = await findGaleryTitleById(galeryTitleId);

  if (!galery) {
    throw new NotFoundError("Galéria nem található");
  }

  const absoluteGaleryPath = resolveFromRepo(galery.path);
  const relativeToUploads = path.relative(UPLOADS_DIR, absoluteGaleryPath);

  // Safety: never delete outside of uploads directory
  const isInsideUploads =
    relativeToUploads &&
    !relativeToUploads.startsWith("..") &&
    !path.isAbsolute(relativeToUploads);

  try {
    if (isInsideUploads) {
      await fs.rm(absoluteGaleryPath, { recursive: true, force: true });

      // Remove empty parent dirs (e.g. uploads/<user>) if they became empty.
      await pruneEmptyDirsUpTo(path.dirname(absoluteGaleryPath), UPLOADS_DIR);
    }
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
