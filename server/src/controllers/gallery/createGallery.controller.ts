import type { NextFunction, Request, Response } from "express";
import { GallerySchemaType } from "../../validation/gallerySchema";
import { createGalleryService } from "../../services/gallery/createGallery.services";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export async function createGalleryController(
  req: Request<{}, {}, GallerySchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { gallery, isPublic } = req.body;
    const username = req.username;

    if (!username) {
      throw new UnauthorizedError("Missing username");
    }

    const galleryObj = await createGalleryService(gallery, isPublic, username);

    res.status(201).json({
      success: true,
      message: "Galéria létrehozva",
      data: {
        _id: galleryObj._id,
        gallery: galleryObj.galeryTitle,
        isPublic: galleryObj.isPublic,
      },
    });
  } catch (err) {
    next(err);
  }
}
