import { Request, Response } from "express";
import GaleryTitleModel from "../../db/galeryTitleSchema";
import GaleryImageModel from "../../db/galeryImageSchema";
import fs from "fs/promises";

export async function deleteGaleryTitle(req: Request, res: Response) {
  try {
    const galeryTitleId = req.params.id;
    //console.log(galeryTitleId);
    if (!galeryTitleId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing galery title ID" });
    }

    const galeryTitleObj = await GaleryTitleModel.findById(galeryTitleId);
    //console.log(galeryTitleObj);
    if (!galeryTitleObj) {
      return res
        .status(404)
        .json({ success: false, message: "Galery title not found!" });
    }

    try {
      // 1. Töröljük a fájlrendszerből a galéria mappáját és annak tartalmát
      await fs.rm(galeryTitleObj.path, { recursive: true, force: true });
    } catch (fsError: unknown) {
      // Ha a mappa nem létezik, folytatjuk (lehet már törölve lett)
      if ((fsError as NodeJS.ErrnoException)?.code !== "ENOENT") {
        console.error("File system error:", fsError);
        return res.status(500).json({
          success: false,
          message: "Hiba a galéria mappájának törlése közben.",
        });
      }
    }

    // 2. Ha a mappa törlés sikeres (vagy nem létezett), töröljük az adatbázisból
    await Promise.all([
      GaleryTitleModel.findByIdAndDelete(galeryTitleId),
      GaleryImageModel.deleteMany({ galeryUrl: galeryTitleObj.url }),
    ]);

    return res.json({
      success: true,
      message: "A galéria és a hozzá tartozó képek sikeresen törölve lettek.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
