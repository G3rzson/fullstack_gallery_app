import type { Request, Response, NextFunction } from "express";

import { deleteManyGalleryImageService } from "../../services/gallery/deleteManyGalleryImage.services";

export async function deleteManyGalleryImageController(
  req: Request<{ galleryId: string }, {}, { ids: string[] }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Nincs megadva törlendő kép." });
    }

    await deleteManyGalleryImageService(ids);

    res.status(200).json({ success: true, message: "Képek törölve." });
  } catch (err) {
    console.error("Hiba a képek törlése során:", err);
    next(err);
  }
}
