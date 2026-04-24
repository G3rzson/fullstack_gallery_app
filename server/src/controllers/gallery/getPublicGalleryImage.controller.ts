import type { Request, Response, NextFunction } from "express";
import { getPublicGalleryImageService } from "../../services/gallery/getPublicGalleryImage.services";

export async function getPublicGalleryImageController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const images = await getPublicGalleryImageService(id);
    res
      .status(200)
      .json({
        success: true,
        message: "Public gallery images retrieved successfully",
        data: images,
      });
  } catch (err) {
    next(err);
  }
}
