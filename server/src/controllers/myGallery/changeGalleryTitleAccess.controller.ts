import type { NextFunction, Request, Response } from "express";
import { changeGalleryTitleAccessService } from "../../services/myGallery/changeGalleryTitleAccess.services";

export async function changeGalleryTitleAccessController(
  req: Request<{ galleryTitleId: string }, {}, { isPublic: boolean }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { isPublic } = req.body;
    const { galleryTitleId } = req.params;

    await changeGalleryTitleAccessService(galleryTitleId, isPublic);

    res.status(200).json({
      success: true,
      message: "Galéria hozzáférés módosítva",
    });
  } catch (err) {
    next(err);
  }
}
