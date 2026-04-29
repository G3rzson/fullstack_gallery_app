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
    const userId = req.userId;

    if (!username || !userId) {
      throw new UnauthorizedError("Missing username or userId in request.");
    }

    const newGalleryTitle = {
      galeryTitle: gallery,
      isPublic: isPublic,
      createdBy: username,
      userId: userId,
    };

    const galleryObj = await createGalleryService(newGalleryTitle);

    res.status(201).json({
      success: true,
      message: "Galéria létrehozva",
      data: galleryObj,
    });
  } catch (err) {
    next(err);
  }
}
