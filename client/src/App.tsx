import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import NavComp from "./Components/NavComp/NavComp";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import GaleryImagePage from "./Pages/GaleryImagePage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <div className="flex min-h-screen">
        <NavComp />

        <div className="flex-1 flex flex-col min-h-0 sm:ml-0 ml-12">
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
  { path: "/galery/:url-params", element: <GaleryImagePage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
];
