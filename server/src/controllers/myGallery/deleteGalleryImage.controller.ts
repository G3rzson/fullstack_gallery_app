import type { NextFunction, Request, Response } from "express";
import { deleteGalleryImageService } from "../../services/myGallery/deleteGalleryImage.services";

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
  } catch (error) {
    next(error);
  }
}
