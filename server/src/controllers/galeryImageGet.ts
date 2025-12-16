import { Request, Response } from "express";
import GaleryImageModel from "../db/models/galeryImage.model";
import type { GaleryImageType } from "../types/types";

export async function galeryImageGet(req: Request, res: Response) {
  try {
    const url = req.params.url;
    if (!url)
      return res.status(400).json({ success: false, message: "Missing url" });

    const images: GaleryImageType[] = await GaleryImageModel.find({
      galeryUrl: url,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      message: "Images retrieved successfully",
      data: images,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
