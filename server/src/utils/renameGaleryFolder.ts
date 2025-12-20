import fs from "fs/promises";
import path from "path";
import { InternalServerError } from "../errors/InternalServerError";

// Utility function to rename gallery folder
export async function renameGaleryFolder(oldPath: string, newPath: string) {
  try {
    await fs.mkdir(path.dirname(newPath), { recursive: true });
    await fs.rename(oldPath, newPath);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      throw new InternalServerError("Hiba a galéria mappa átnevezése közben");
    }
  }
}
