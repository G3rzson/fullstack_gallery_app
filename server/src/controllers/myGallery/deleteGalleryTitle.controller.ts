import type { NextFunction, Request, Response } from "express";
import { deleteGalleryTitleService } from "../../services/myGallery/deleteGalleryTitle.services";

export async function deleteGalleryTitleController(
  req: Request<{ galleryTitleId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryTitleId } = req.params;

    await deleteGalleryTitleService(galleryTitleId);

    res.status(200).json({
      success: true,
      message: "Galéria törölve",
    });
  } catch (err) {
    next(err);
  }
}
