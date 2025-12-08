import { Request, Response } from "express";
import GaleryImageModel from "../../db/galeryImageSchema";

type ImageItem = {
  filename: string;
  url: string;
  galeryUrl: string;
  createdAt?: Date;
};

export async function getGaleryImages(req: Request, res: Response) {
  try {
    const url = req.params.url;
    if (!url)
      return res.status(400).json({ success: false, message: "Missing url" });

    const images: ImageItem[] = await GaleryImageModel.find({
      galeryUrl: url,
    }).sort({
      createdAt: -1,
    });

    return res.json({ success: true, images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
