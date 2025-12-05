import { Request, Response } from "express";
import GaleryTitleModel from "../../db/galeryTitleSchema";

export async function getGaleryTitles(req: Request, res: Response) {
  try {
    const galeryTitles = await GaleryTitleModel.find();
    return res.status(200).json({
      success: true,
      galeryTitles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
