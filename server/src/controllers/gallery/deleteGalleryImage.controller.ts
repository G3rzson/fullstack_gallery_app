import type { NextFunction, Request, Response } from "express";
import { deleteGalleryImageService } from "../../services/gallery/deleteGalleryImage.services";

export async function deleteGalleryImageController(
  req: Request<{ imageId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { imageId } = req.params;

    await deleteGalleryImageService(imageId);

    res.status(200).json({
      success: true,
      message: "Kép törölve",
    });
  } catch (err) {
    console.error("Hiba a kép törlése során:", err);
    next(err);
  }
}
