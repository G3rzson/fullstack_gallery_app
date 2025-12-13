import LoginPage from "../Pages/Auth/Login/LoginPage";
import RegisterPage from "../Pages/Auth/Register/RegisterPage";
import GaleryPage from "../Pages/GaleryPage/GaleryPage";
import HomePage from "../Pages/Home/HomePage";
import NotFoundPage from "../Pages/NotFound/NotFoundPage";
import { Route, Routes } from "react-router-dom";

const ROUTES = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/galery/:url-params", element: <GaleryPage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
];

export default function HandleRoutes() {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
