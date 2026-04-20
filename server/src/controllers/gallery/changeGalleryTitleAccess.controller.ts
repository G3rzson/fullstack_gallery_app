import type { NextFunction, Request, Response } from "express";
import { changeGalleryTitleAccessService } from "../../services/gallery/changeGalleryTitleAccess.services";

export async function changeGalleryTitleAccessController(
  req: Request<{ galleryId: string }, {}, { isPublic: boolean }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { isPublic } = req.body;
    const { galleryId } = req.params;

    await changeGalleryTitleAccessService(galleryId, isPublic);

    res.status(200).json({
      success: true,
      message: "Galéria hozzáférés módosítva",
    });
  } catch (err) {
    next(err);
  }
}
