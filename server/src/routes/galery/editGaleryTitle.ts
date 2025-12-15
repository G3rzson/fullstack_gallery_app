import { Request, Response } from "express";
import GaleryTitleModel from "../../db/galeryTitleSchema";
import GaleryImageModel from "../../db/galeryImageSchema";
import fs from "fs/promises";
import path from "path";
import { galeryTitleFormSchema } from "../../validation/galeryTitleFormSchema";
import sanitize from "sanitize-filename";
import slugify from "slugify";

export async function editGaleryTitle(req: Request, res: Response) {
  try {
    const galeryTitleId = req.params.id;
    if (!galeryTitleId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing galery title ID" });
    }

    // Validáció
    const result = galeryTitleFormSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, message: "Validation error!" });
    }
    const { galeryTitle } = result.data;

    // Biztonságos mappa és slug
    const safeFolderName = sanitize(galeryTitle);
    const galeryFolderPath = path.join("uploads", safeFolderName);

    let slug = slugify(safeFolderName, { lower: true, strict: true });
    let counter = 1;
    while (
      await GaleryTitleModel.findOne({ url: slug, _id: { $ne: galeryTitleId } })
    ) {
      slug = `${slugify(safeFolderName, {
        lower: true,
        strict: true,
      })}-${counter}`;
      counter++;
    }

    const galeryTitleObj = await GaleryTitleModel.findById(galeryTitleId);
    if (!galeryTitleObj) {
      return res
        .status(404)
        .json({ success: false, message: "Galery title not found!" });
    }

    // Régi path
    const oldPath =
      galeryTitleObj.path || path.join("uploads", galeryTitleObj.url);

    // Biztosítjuk, hogy a cél szülő mappa létezik
    await fs.mkdir(path.dirname(galeryFolderPath), { recursive: true });

    // Mappa átnevezés (ha létezik a régi)
    try {
      await fs.rename(oldPath, galeryFolderPath);
    } catch (fsError: unknown) {
      if ((fsError as NodeJS.ErrnoException)?.code !== "ENOENT") {
        console.error("File system error:", fsError);
        return res.status(500).json({
          success: false,
          message: "Hiba a galéria mappa átnevezése közben.",
        });
      }
      // Ha nem létezett a régi mappa, folytatjuk
    }

    // Adatbázis frissítése
    const oldSlug = galeryTitleObj.url; // a képek frissítéséhez kell
    galeryTitleObj.galeryTitle = galeryTitle;
    galeryTitleObj.url = slug;
    galeryTitleObj.path = galeryFolderPath;
    await galeryTitleObj.save();

    // Frissítjük a GaleryImage rekordokat
    const imagesToUpdate = await GaleryImageModel.find({ galeryUrl: oldSlug });
    if (imagesToUpdate.length > 0) {
      const newFolderName = safeFolderName;
      const bulkOps = imagesToUpdate.map((img) => {
        const currentUrl = img.url;
        // Extract folder segment after "/uploads/"
        // Example: "/uploads/Galéria/filename.jpg" -> folderSegment = "Galéria"
        const match = currentUrl.match(/^\/uploads\/([^/]+)\//);
        const currentFolder = match?.[1];
        const newPrefix = path.posix.join("/uploads", newFolderName, "/");
        let newUrl = currentUrl;
        if (currentFolder) {
          const currentPrefix = path.posix.join("/uploads", currentFolder, "/");
          if (currentUrl.startsWith(currentPrefix)) {
            newUrl = newPrefix + currentUrl.slice(currentPrefix.length);
          }
        }

        return {
          updateOne: {
            filter: { _id: img._id },
            update: { $set: { galeryUrl: slug, url: newUrl } },
          },
        };
      });

      await GaleryImageModel.bulkWrite(bulkOps);
    }

    return res.json({
      success: true,
      message: "Galéria sikeresen frissítve!",
      data: galeryTitleObj,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
}
