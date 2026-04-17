import { lazy } from "react";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

const RegisterPage = lazy(() => import("./pages/User/Register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/User/Login/LoginPage"));

const PrivacyPage = lazy(() => import("./pages/Privacy/PrivacyPage"));

const MyGalleriesPage = lazy(
  () => import("./pages/MyGalleries/MyGalleriesPage"),
);
const MyGalleryCreatePage = lazy(
  () => import("./pages/MyGalleries/MyGalleryCreatePage"),
);
const MyGalleryPage = lazy(() => import("./pages/MyGalleries/MyGalleryPage"));
const GalleryPage = lazy(() => import("./pages/Galleries/GalleryPage"));
const GalleriesPage = lazy(() => import("./pages/Galleries/GalleriesPage"));

export const ROUTES = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/", element: <HomePage /> },

  // Public galleries routes
  { path: "/galleries", element: <GalleriesPage /> },
  { path: "/galleries/:id", element: <GalleryPage /> },

  // My galleries routes
  { path: "/my-galleries", element: <MyGalleriesPage /> },
  { path: "/my-galleries/:id", element: <MyGalleryPage /> },
  { path: "/my-galleries/title/create", element: <MyGalleryCreatePage /> },

  // User routes
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
];
