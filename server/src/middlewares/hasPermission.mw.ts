import type { Request, Response, NextFunction } from "express";
import { getGalleryById } from "../db/dal/galery.repository";

export async function hasPermissionMW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const galleryId = req.params.galleryId as string;
    const username = req.username;

    if (!galleryId) {
      return res.status(400).json({
        success: false,
        message: "Gallery ID is required",
      });
    }
    if (!username) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const galleryObj = await getGalleryById(galleryId);

    if (!galleryObj) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (galleryObj.createdBy !== username) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  } catch (err) {
    console.error("Error in hasPermissionMW:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
