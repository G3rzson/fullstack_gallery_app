import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import Sidebar from "./components/Sidebar/Sidebar";
import PageLoader from "./components/PageLoader/PageLoader";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <ThemeSwitcher />
      <Sidebar />
      <Toaster position="bottom-right" />

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
