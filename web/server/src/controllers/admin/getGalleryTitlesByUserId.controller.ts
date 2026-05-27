import type { NextFunction, Request, Response } from "express";
import { getGalleryTitlesByUserIdService } from "../../services/admin/getGalleryTitleByUserId.services";

export async function getGalleryTitlesByUserIdController(
  req: Request<{ userId: string }, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    const search = req.query.search;

    const galleryTitles = await getGalleryTitlesByUserIdService(userId, search);

    res.status(200).json({
      success: true,
      message: "Gallery címek lekérve",
      data: galleryTitles,
    });
  } catch (err) {
    next(err);
  }
}
