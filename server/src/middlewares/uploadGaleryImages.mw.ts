import multer, { FileFilterCallback } from "multer";
import sanitize from "sanitize-filename";
import type { Request } from "express";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILES_COUNT_AT_THE_SAME_TIME,
} from "../zodSchemas/galeryImageFormSchema";
import fs from "fs/promises";
import { findGaleryTitleByUrl } from "../db/repositories/galery.repository";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { resolveFromRepo } from "../config/paths";

/* -----------------------------------------------------------------------------------------
   | todo: lefejleszteni hogy az eredeti fájlnév megmaradjon és kezelje a duplikációkat     |
   ----------------------------------------------------------------------------------------- */

const storage = multer.diskStorage({
  destination(req: Request, _file: Express.Multer.File, cb) {
    (async () => {
      const username = req.username;
      const slug = req.params.url;

      if (!username) throw new UnauthorizedError("Missing username");
      if (!slug) throw new NotFoundError("Galéria nem található");

      const galery = await findGaleryTitleByUrl(slug);
      if (!galery) throw new NotFoundError("Galéria nem található");
      if (galery.createdBy !== username) {
        throw new UnauthorizedError("Nincs jogosultságod ehhez a galériához");
      }

      const absoluteGaleryDir = resolveFromRepo(galery.path);
      await fs.mkdir(absoluteGaleryDir, { recursive: true });

      cb(null, absoluteGaleryDir);
    })().catch((err: unknown) => cb(err as Error, ""));
  },

  filename(_req: Request, file: Express.Multer.File, cb) {
    const safe = sanitize(file.originalname);
    const unique = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${safe}`;

    cb(null, unique);
  },
});

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(new Error("Nem támogatott fájltípus"));
    return;
  }

  cb(null, true);
}

export const uploadGaleryImagesMW = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
}).array("galeryImages", MAX_FILES_COUNT_AT_THE_SAME_TIME);
