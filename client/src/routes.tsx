import { lazy } from "react";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));
const GalleriesPage = lazy(() => import("./pages/Galleries/GalleriesPage"));

export const ROUTES = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/galleries", element: <GalleriesPage /> },
];
