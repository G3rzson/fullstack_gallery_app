import { Request, Response, NextFunction } from "express";
import GaleryImageModel from "../../db/models/galeryImage.model";
import path from "path";
import { BadRequestError } from "../../errors/BadRequestError";

export async function galeryImageCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[];
    const gal = (req as any).galery;

    if (!files || files.length === 0) {
      throw new BadRequestError("Nincsenek feltöltött fájlok");
    }

    const folderName = path.basename(gal.path);

    const saved = files.map((f) => ({
      filename: f.filename,
      url: `/uploads/${folderName}/${f.filename}`,
      galeryUrl: gal.url,
      createdAt: new Date(),
    }));

    await GaleryImageModel.insertMany(saved);

    res.json({
      success: true,
      message: "Képek sikeresen feltöltve",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
}
