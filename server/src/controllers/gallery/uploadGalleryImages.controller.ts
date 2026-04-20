import type { NextFunction, Request, Response } from "express";

export async function uploadGalleryImagesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { galleryId } = req.params as { galleryId: string };
    const username = req.username;

    console.log("=== Képek feltöltése ===");
    console.log("Gallery ID:", galleryId);
    console.log("Username:", username);
    console.log("Body:", req.body);
    console.log("=======================");

    res.status(200).json({
      success: true,
      message: "Képek sikeresen feltöltve (dev mode)",
    });
  } catch (err) {
    next(err);
  }
}
