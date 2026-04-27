import { useGalleryContext } from "./useGalleryContext";
import { useModalContext } from "./useModalContext";

export function useModalClose() {
  const { setIsModalOpen, setMode } = useModalContext();
  const { setGalleryImageObj } = useGalleryContext();

  return () => {
    setIsModalOpen(false);
    setGalleryImageObj(null);
    setMode("default");
  };
}
