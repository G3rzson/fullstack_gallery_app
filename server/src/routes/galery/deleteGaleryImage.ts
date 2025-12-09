import { Request, Response } from "express";
import GaleryImageModel from "../../db/galeryImageSchema";
import fs from "fs/promises";
import path from "path";

export async function deleteGaleryImage(req: Request, res: Response) {
  try {
    const galeryImageId = req.params.id;
    //console.log(galeryImageId);
    if (!galeryImageId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing galery title ID" });
    }

    const galeryImageObj = await GaleryImageModel.findById(galeryImageId);
    //console.log(galeryImageObj);
    if (!galeryImageObj) {
      return res
        .status(404)
        .json({ success: false, message: "Galery image not found!" });
    }

    try {
      // Levágjuk az elejéről a perjelet → uploads/...
      const relativePath = galeryImageObj.url.replace(/^\/+/, "");

      // Teljes fájlrendszer útvonal
      const filePath = path.join(process.cwd(), relativePath);

      // 1. Töröljük a fájlrendszerből a képet
      await fs.rm(filePath, { force: true });
    } catch (fsError: unknown) {
      // Ha a kép nem létezik, folytatjuk (lehet már törölve lett)
      if ((fsError as NodeJS.ErrnoException)?.code !== "ENOENT") {
        console.error("File system error:", fsError);
        return res.status(500).json({
          success: false,
          message: "Hiba a kép törlése közben!",
        });
      }
    }

    // 2. Ha a kép törlés sikeres (vagy nem létezett), töröljük az adatbázisból
    await GaleryImageModel.findByIdAndDelete(galeryImageId);

    return res.json({
      success: true,
      message: "A kép sikeresen törölve lett!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
