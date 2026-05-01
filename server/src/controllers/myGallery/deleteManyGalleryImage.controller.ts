import type { Request, Response, NextFunction } from "express";

import { deleteManyGalleryImageService } from "../../services/myGallery/deleteManyGalleryImage.services";
import { BadRequestError } from "../../errors/BadRequestError";

export async function deleteManyGalleryImageController(
  req: Request<{}, {}, { ids: string[] }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { ids } = req.body;
    console.log("Törlendő képek ID-jei:", ids);
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestError("Nincs megadva törlendő kép.");
    }

    await deleteManyGalleryImageService(ids);

    res.status(200).json({ success: true, message: "Képek törölve." });
  } catch (err) {
    next(err);
  }
}
