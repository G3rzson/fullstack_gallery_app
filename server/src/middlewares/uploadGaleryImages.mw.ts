import multer, { FileFilterCallback } from "multer";
import sanitize from "sanitize-filename";
import type { Request } from "express";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "../zodSchemas/galeryImageFormSchema";

const storage = multer.diskStorage({
  destination(req: Request, _file: Express.Multer.File, cb) {
    const galery = (req as any).galery;
    cb(null, galery.path);
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
}).array("galeryImages", 20);
