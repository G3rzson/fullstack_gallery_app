import { useContext } from "react";
import { GalleryContext } from "../context/GalleryContext";

export function useGalleryContext() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error(
      "useGalleryContext must be used within a GalleryContextProvider",
    );
  }
  return context;
}
