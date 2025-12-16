import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import sanitize from "sanitize-filename";
import GaleryTitleModel from "../db/models/galeryTitle.model";
import GaleryImageModel from "../db/models/galeryImage.model";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    const url = req.params.url;
    if (!url) return cb(new Error("Missing gallery url param"));

    GaleryTitleModel.findOne({ url })
      .then(async (gal) => {
        if (!gal) return cb(new Error("Galery not found"));
        const dest = gal.path || path.join("uploads", gal.url || url);
        try {
          await fs.mkdir(dest, { recursive: true });
          cb(null, dest);
        } catch (err) {
          cb(err as Error);
        }
      })
      .catch((err) => cb(err));
  },
  filename(_req: any, file: any, cb: any) {
    const safe = sanitize(file.originalname as string);
    const unique = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${safe}`;
    cb(null, unique);
  },
});

function fileFilter(_req: Request, file: any, cb: any) {
  if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"));
}

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const uploadGaleryImagesMW = upload.array("galeryImages", 20);

export async function galeryImageCreate(req: Request, res: Response) {
  try {
    const url = req.params.url;
    const files = ((req as any).files as any[]) || [];

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Nincsenek feltöltött fájlok." });
    }

    const gal = await GaleryTitleModel.findOne({ url });
    if (!gal) {
      return res
        .status(404)
        .json({ success: false, message: "Galéria nem található." });
    }

    const folderName = path.basename(gal.path || url);

    const saved = files.map((f) => ({
      filename: f.filename,
      url: `/uploads/${folderName}/${f.filename}`,
      galeryUrl: url,
      createdAt: new Date(),
    }));

    // Save to DB
    await GaleryImageModel.insertMany(saved);

    return res.json({
      success: true,
      message: "Images uploaded successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
}
