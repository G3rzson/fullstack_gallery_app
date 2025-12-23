import { useState, type ReactNode } from "react";
import { ModalContext } from "./DeleteModalContext";

export type ModalProps = {
  content: ReactNode;
  onConfirm?: () => void;
  isPending?: boolean;
};

export type ModalContextType = {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const openModal = (props: ModalProps) => setModalProps(props);
  const closeModal = () => setModalProps(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && <>{modalProps.content}</>}
    </ModalContext.Provider>
  );
};
