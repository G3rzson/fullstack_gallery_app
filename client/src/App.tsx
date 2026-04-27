import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import PageLoader from "./components/PageLoader";
import Modal from "./components/Modal";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { useGalleryContext } from "./hooks/useGalleryContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useModalContext } from "./hooks/useModalContext";

export default function App() {
  const { galleryImageObj } = useGalleryContext();
  const { isModalOpen, setIsModalOpen, mode } = useModalContext();

  return (
    <>
      <ThemeSwitcher />
      <Sidebar />
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            style: {
              background: "var(--error-bg)",
              border: "1px solid var(--error-border)",
              color: "var(--error-text)",
              borderRadius: "10px",
              padding: "16px",
            },
          },

          success: {
            style: {
              background: "var(--success-bg)",
              border: "1px solid var(--success-border)",
              color: "var(--success-text)",
              borderRadius: "10px",
              padding: "16px",
            },
          },
        }}
      />
      <CookieConsentBanner />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode}
      >
        {galleryImageObj ? (
          <img
            src={galleryImageObj.publicUrl}
            alt={galleryImageObj.originalName}
            className="max-w-full max-h-[95vh] w-auto h-auto rounded-2xl object-contain"
          />
        ) : (
          <PageLoader />
        )}
      </Modal>

      {/* ms-10 - 40px => sidebar closed width if you want to change the margin size, change this and the w-10 on sidebar in Sidebar.tsx */}
      <main className="flex flex-col p-4 grow ms-10 h-screen overflow-y-auto">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {ROUTES.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
