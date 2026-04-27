import type { NextFunction, Request, Response } from "express";
import { GallerySchemaType } from "../../validation/gallerySchema";
import { updateGalleryService } from "../../services/gallery/updateGallery.services";

export async function updateGalleryController(
  req: Request<{ galleryId: string }, {}, GallerySchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { gallery, isPublic } = req.body;
    const { galleryId } = req.params;

    const galleryObj = await updateGalleryService(galleryId, gallery, isPublic);

    res.status(200).json({
      success: true,
      message: "Galéria frissítve",
      data: galleryObj,
    });
  } catch (err) {
    next(err);
  }
}
