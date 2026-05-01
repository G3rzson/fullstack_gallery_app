import { lazy } from "react";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/user/LoginPage"));
const RegisterPage = lazy(() => import("./pages/user/RegisterPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const PublicGalleryTitlesPage = lazy(
  () => import("./pages/publicGallery/PublicGalleryTitlesPage"),
);
const PublicGalleryImagesPage = lazy(
  () => import("./pages/publicGallery/PublicGalleryImagesPage"),
);
const MyGalleryTitlesPage = lazy(
  () => import("./pages/myGallery/MyGalleryTitlesPage"),
);
const MyGalleryTitleCreatePage = lazy(
  () => import("./pages/myGallery/MyGalleryTitleCreatePage"),
);
const MyGalleryPage = lazy(
  () => import("./pages/myGallery/MyGalleryImagePage"),
);
const MyGalleryTitleUpdatePage = lazy(
  () => import("./pages/myGallery/MyGalleryTitleUpdatePage"),
);
const MyGalleryImageAddPage = lazy(
  () => import("./pages/myGallery/MyGalleryImageAddPage"),
);
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminGalleryTitlesPage = lazy(
  () => import("./pages/admin/AdminGalleryTitlesPage"),
);

const AdminGalleryImagePage = lazy(
  () => import("./pages/admin/AdminGalleryImagePage"),
);

export const ROUTES = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/public-gallery-titles", element: <PublicGalleryTitlesPage /> },
  {
    path: "/public-gallery-titles/:galleryTitleId",
    element: <PublicGalleryImagesPage />,
  },
  { path: "/my-gallery-titles", element: <MyGalleryTitlesPage /> },
  { path: "/my-gallery-titles/create", element: <MyGalleryTitleCreatePage /> },
  {
    path: "/my-gallery-titles/update/:id",
    element: <MyGalleryTitleUpdatePage />,
  },
  { path: "/my-gallery-titles/:id", element: <MyGalleryPage /> },

  {
    path: "/my-gallery-titles/:galleryTitleId/add",
    element: <MyGalleryImageAddPage />,
  },
  { path: "/admin/users", element: <AdminUsersPage /> },
  { path: "/admin/users/:userId", element: <AdminGalleryTitlesPage /> },
  {
    path: "/admin/users/:userId/:galleryTitleId",
    element: <AdminGalleryImagePage />,
  },
];
