import type { Request, Response, NextFunction } from "express";
import { getPublicGalleryImageService } from "../../services/publicGallery/getPublicGalleryImage.services";

export async function getPublicGalleryImageController(
  req: Request<{ galleryTitleId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryTitleId } = req.params;
    const images = await getPublicGalleryImageService(galleryTitleId);
    res.status(200).json({
      success: true,
      message: "Public gallery images retrieved successfully",
      data: images,
    });
  } catch (err) {
    next(err);
  }
}
