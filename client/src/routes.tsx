import { lazy } from "react";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const PublicGalleryTitlesPage = lazy(
  () => import("./pages/PublicGalleryTitlesPage"),
);
const SinglePublicGalleryPage = lazy(
  () => import("./pages/SinglePublicGalleryPage"),
);
const MyGalleryTitlesPage = lazy(() => import("./pages/MyGalleryTitlesPage"));
const CreateMyGalleryTitlePage = lazy(
  () => import("./pages/CreateMyGalleryTitlePage"),
);
const MyGalleryPage = lazy(() => import("./pages/MyGalleryImagePage"));
const MyGalleryTitleUpdatePage = lazy(
  () => import("./pages/UpdateMyGalleryTitlePage"),
);
const GalleryImageAdd = lazy(() => import("./pages/GalleryImageAdd"));

export const ROUTES = [
  { path: "*", element: <NotFoundPage /> },

  { path: "/", element: <HomePage /> },

  { path: "/user/register", element: <RegisterPage /> },

  { path: "/user/login", element: <LoginPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/public-gallery-titles", element: <PublicGalleryTitlesPage /> },
  {
    path: "/public-gallery-titles/:id",
    element: <SinglePublicGalleryPage />,
  },
  { path: "/my-gallery-titles", element: <MyGalleryTitlesPage /> },
  { path: "/my-gallery-titles/create", element: <CreateMyGalleryTitlePage /> },
  {
    path: "/my-gallery-titles/update/:id",
    element: <MyGalleryTitleUpdatePage />,
  },
  { path: "/my-gallery-titles/:id", element: <MyGalleryPage /> },
  { path: "/my-gallery/image/add/:id", element: <GalleryImageAdd /> },
];
