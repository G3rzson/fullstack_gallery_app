import type { NextFunction, Request, Response } from "express";
import { uploadGalleryImagesService } from "../../services/myGallery/uploadGalleryImages.services";

export async function uploadGalleryImagesController(
  req: Request<{ galleryTitleId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log("uploadGalleryImagesController - req.params:", req.params);
    const { galleryTitleId } = req.params;
    const createdBy = req.username as string;
    const userId = req.userId as string;

    const files = Array.isArray(req.files) ? req.files : [];
    if (!files.length) {
      throw new Error("Nincs feltöltött kép.");
    }

    const savedImages = await uploadGalleryImagesService({
      files,
      galleryTitleId,
      createdBy,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Képek sikeresen feltöltve és elmentve.",
      data: savedImages,
    });
  } catch (error) {
    console.error("Error in uploadGalleryImagesController:", error);
    next(error);
  }
}
