import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import NavComp from "./Components/NavComp/NavComp";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import MyGaleries from "./Pages/MyGaleriesPage";
import GaleryImageViewerPage from "./Pages/GaleryImageViewerPage";
import GaleryTitlePage from "./Pages/GaleryTitlePage";
import GaleryImageUploadPage from "./Pages/GaleryImageUploadPage";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <div className="flex flex-row items-stretch min-h-dvh">
        <NavComp />

        <div className="flex-1 flex flex-col min-h-0">
          <Routes>
            {ROUTES.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>

          <Footer />
        </div>
      </div>
    </>
  );
}

const ROUTES = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/my-galery-titles", element: <MyGaleries /> },
  { path: "/galery-title", element: <GaleryTitlePage /> },
  { path: "/galery/:url-params", element: <GaleryImageViewerPage /> },
  {
    path: "/galery/image/upload/:url-params",
    element: <GaleryImageUploadPage />,
  },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
];
