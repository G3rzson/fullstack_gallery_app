import { useState } from "react";
import { ModalContext } from "./ModalContext";

export type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "default" | "loader";
  setMode: React.Dispatch<React.SetStateAction<"default" | "loader">>;
};

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"default" | "loader">("default");

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        mode,
        setMode,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
