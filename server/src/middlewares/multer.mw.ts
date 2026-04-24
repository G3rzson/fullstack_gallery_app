import multer from "multer";

// Egyszerű memória alapú tároló (nem menti le fájlként, csak a memóriában tartja)
export const upload = multer({ storage: multer.memoryStorage() });
