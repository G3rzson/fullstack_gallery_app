import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Toaster } from "react-hot-toast";
import ThemeSwitcher from "./shared/components/ThemeSwitcher/ThemeSwitcher";
import Sidebar from "./shared/components/Sidebar/Sidebar";
import PageLoader from "./shared/components/PageLoader/PageLoader";

export default function App() {
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
      <main className="app-content">
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
