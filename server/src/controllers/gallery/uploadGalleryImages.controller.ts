import type { NextFunction, Request, Response } from "express";
import { uploadGalleryImagesService } from "../../services/gallery/uploadGalleryImages.services";

export async function uploadGalleryImagesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryId } = req.params as { galleryId: string };
    const createdBy = req.username ?? "unknown"; // vagy később req.userId ha lesz

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
    });

    res.status(200).json({
      success: true,
      message: "Képek sikeresen feltöltve és elmentve.",
      data: savedImages,
    });
  } catch (err) {
    console.error("Hiba a képek feltöltésekor:", err);
    next(err);
  }
}
