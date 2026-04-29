import type { NextFunction, Request, Response } from "express";
import { uploadGalleryImagesService } from "../../services/gallery/uploadGalleryImages.services";

export async function uploadGalleryImagesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryId } = req.params as { galleryId: string };
    const createdBy = req.username as string;
    const userId = req.userId as string;

    const files = Array.isArray(req.files) ? req.files : [];
    if (!files.length) {
      return res
        .status(400)
        .json({ success: false, message: "Nincs feltöltött kép." });
    }

    const savedImages = await uploadGalleryImagesService({
      files,
      galleryId,
      createdBy,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Képek sikeresen feltöltve és elmentve.",
      data: savedImages,
    });
  } catch (error) {
    next(error);
  }
}
