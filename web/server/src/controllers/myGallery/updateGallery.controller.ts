import type { NextFunction, Request, Response } from "express";
import { GallerySchemaType } from "../../validation/gallerySchema";
import { updateGalleryService } from "../../services/myGallery/updateGallery.services";

export async function updateGalleryController(
  req: Request<{ galleryTitleId: string }, {}, GallerySchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { gallery, isPublic } = req.body;
    const { galleryTitleId } = req.params;

    const galleryObj = await updateGalleryService(
      galleryTitleId,
      gallery,
      isPublic,
    );

    res.status(200).json({
      success: true,
      message: "Galéria frissítve",
      data: galleryObj,
    });
  } catch (err) {
    next(err);
  }
}
