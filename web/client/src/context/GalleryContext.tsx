import { createContext } from "react";
import type { GalleryContextType } from "./GalleryContextProvider";

export const GalleryContext = createContext<GalleryContextType | undefined>(
  undefined,
);
