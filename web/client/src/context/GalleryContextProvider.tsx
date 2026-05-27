import { useState } from "react";
import type { GalleryImageType } from "../types/types";
import { GalleryContext } from "./GalleryContext";

export type GalleryContextType = {
  galleryImageObj: GalleryImageType | null;
  setGalleryImageObj: React.Dispatch<
    React.SetStateAction<GalleryImageType | null>
  >;
  deletingIdArray: string[];
  setDeletingIdArray: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GalleryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [galleryImageObj, setGalleryImageObj] =
    useState<GalleryImageType | null>(null);
  const [deletingIdArray, setDeletingIdArray] = useState<string[]>([]);

  return (
    <GalleryContext.Provider
      value={{
        galleryImageObj,
        setGalleryImageObj,
        deletingIdArray,
        setDeletingIdArray,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}
