import { useState } from "react";
import { GlobalContext } from "./Context";
import type { GaleryTitleType } from "../Types/types";

export type ContextType = {
  editingGaleryTitleObj: GaleryTitleType | null;
  setEditingGaleryTitleObj: React.Dispatch<
    React.SetStateAction<GaleryTitleType | null>
  >;
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editingGaleryTitleObj, setEditingGaleryTitleObj] =
    useState<GaleryTitleType | null>(null);

  return (
    <GlobalContext.Provider
      value={{ editingGaleryTitleObj, setEditingGaleryTitleObj }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
