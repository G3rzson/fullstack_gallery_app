import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import CreateGalery from "../Pages/Galery/CreateGalery";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

export const ROUTES = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/galery/create", element: <CreateGalery /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
];
