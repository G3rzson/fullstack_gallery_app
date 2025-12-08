import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import Galery from "../../Pages/Galery";
import Home from "../../Pages/Home";
import NotFound from "../../Pages/NotFound";
import { Route, Routes } from "react-router-dom";

const ROUTES = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/galery/:url", element: <Galery /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
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
