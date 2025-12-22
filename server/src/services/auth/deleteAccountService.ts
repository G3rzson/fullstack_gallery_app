import fs from "fs/promises";
import path from "path";
import sanitize from "sanitize-filename";
import { UPLOADS_DIR } from "../../config/paths";
import {
  deleteUserByUsername,
  findUserByUsername,
} from "../../db/repositories/auth.repository";
import {
  deleteGaleryImagesByCreatedBy,
  deleteGaleryTitlesByCreatedBy,
} from "../../db/repositories/galery.repository";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";

async function deleteUserUploadsDir(username: string) {
  const safeUserFolder = sanitize(username);
  const absoluteUserDir = path.join(UPLOADS_DIR, safeUserFolder);
  const relativeToUploads = path.relative(UPLOADS_DIR, absoluteUserDir);

  // Safety: never delete outside of uploads directory
  const isInsideUploads =
    relativeToUploads &&
    !relativeToUploads.startsWith("..") &&
    !path.isAbsolute(relativeToUploads);

  if (!isInsideUploads) return;

  try {
    await fs.rm(absoluteUserDir, { recursive: true, force: true });
  } catch (err: unknown) {
    const fsErr = err as NodeJS.ErrnoException;
    if (fsErr.code !== "ENOENT") throw err;
  }
}

export async function deleteAccountService(username: string) {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new NotFoundError("Felhasználó nem található.");
  }

  try {
    // 1) DB cleanup: delete user's galery titles + images
    await Promise.all([
      deleteGaleryImagesByCreatedBy(username),
      deleteGaleryTitlesByCreatedBy(username),
    ]);

    // 2) FS cleanup: remove uploads/<username> folder recursively
    await deleteUserUploadsDir(username);

    // 3) Delete user account
    await deleteUserByUsername(username);
  } catch (err) {
    throw new InternalServerError("A fiók törlése sikertelen.");
  }
}
