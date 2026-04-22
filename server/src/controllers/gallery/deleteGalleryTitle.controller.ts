import type { NextFunction, Request, Response } from "express";
import { deleteGalleryTitleService } from "../../services/gallery/deleteGalleryTitle.services";

export async function deleteGalleryTitleController(
  req: Request<{ galleryId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryId } = req.params;

    await deleteGalleryTitleService(galleryId);

    res.status(200).json({
      success: true,
      message: "Galéria törölve",
    });
  } catch (err) {
    console.error("Hiba a galéria törlésekor:", err);
    next(err);
  }
}
