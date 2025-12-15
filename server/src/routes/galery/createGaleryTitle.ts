import { Request, Response } from "express";
import { galeryTitleFormSchema } from "../../validation/galeryTitleFormSchema";
import fs from "fs/promises";
import path from "path";
import GaleryTitleModel from "../../db/galeryTitleSchema";
import sanitize from "sanitize-filename";
import slugify from "slugify";

export async function createGaleryTitle(req: Request, res: Response) {
  try {
    const result = galeryTitleFormSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Hibás adat!",
      });
    }

    const { galeryTitle } = result.data;
    const safeFolderName = sanitize(galeryTitle);
    //console.log("Safe folder name:", safeFolderName);
    const galeryFolderPath = path.join("uploads", safeFolderName);

    const safeUrl = slugify(safeFolderName, {
      lower: true, // kisbetűs legyen
      strict: true, // csak a-z0-9 és kötőjel
    });

    let slug = safeUrl;
    let counter = 1;

    while (await GaleryTitleModel.findOne({ url: slug })) {
      slug = `${safeUrl}-${counter}`;
      counter++;
    }

    try {
      await fs.mkdir(galeryFolderPath, { recursive: true });
    } catch (err: any) {
      if (err.code === "EEXIST") {
        return res
          .status(400)
          .json({ success: false, message: "Galéria már létezik!" });
      }
      throw err;
    }

    const newGaleryTitle = new GaleryTitleModel({
      galeryTitle,
      path: galeryFolderPath,
      url: slug,
    });

    try {
      await newGaleryTitle.save();
    } catch (error: unknown) {
      const mongoError = error as { code?: number };
      if (mongoError.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Galéria már létezik!",
        });
      }
      if (error instanceof Error) console.error(error.message);
      throw error;
    }

    return res.json({
      success: true,
      message: "Galéria létrehozva!",
      data: newGaleryTitle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Szerver hiba!",
    });
  }
}
