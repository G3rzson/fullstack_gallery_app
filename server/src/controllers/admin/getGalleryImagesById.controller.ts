import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { getAllGalleryImagesByIdService } from "../../services/admin/getAllGalleryImageById.services";

export async function getGalleryImagesByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleryTitleId = req.params.galleryTitleId as string;

    console.log(
      "getGalleryImagesByIdController - galleryTitleId:",
      galleryTitleId,
    );
    if (!galleryTitleId) {
      throw new UnauthorizedError("Gallery Title ID is required.");
    }

    const galleryImages = await getAllGalleryImagesByIdService(galleryTitleId);

    console.log(
      "getGalleryImagesByIdController - galleryImages:",
      galleryImages,
    );
    res.status(200).json({
      success: true,
      message: "Gallery képek lekérve",
      data: galleryImages,
    });
  } catch (err) {
    console.error("Error in getGalleryImagesByIdController:", err);
    next(err);
  }
}
