import { Request, Response } from "express";
import GaleryTitleModel from "../../db/galeryTitleSchema";
import type { GaleryTitleType } from "../../types/types";

export async function getGaleryTitles(req: Request, res: Response) {
  try {
    const galeryTitles = await GaleryTitleModel.find().lean<
      GaleryTitleType[]
    >();
    return res.status(200).json({
      success: true,
      message: "Galéria címek lekérve sikeresen!",
      data: galeryTitles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Szerver hiba!",
    });
  }
}
