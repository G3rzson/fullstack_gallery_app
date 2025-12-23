import { useContext } from "react";
import { ModalContext } from "../GlobalContext/DeleteModalContext";

export const useDeleteModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useDeleteModal must be used within ModalProvider");
  return context;
};
