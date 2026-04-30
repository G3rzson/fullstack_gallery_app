import useGetAllUsers from "../hooks/useGetAllUsers";
import useGetAllAdminGalleryTitle from "../hooks/useGetAllAdminGalleryTitle";
import EmptyList from "./EmptyList";
import PageLoader from "./PageLoader";
import ServerError from "./ServerError";
import type {
  GalleryImageType,
  GalleryTitleType,
  GetDataType,
  UserObjType,
} from "../types/types";
import AdminUsers from "./AdminUsers";
import AdminGalleryTitles from "./AdminGalleryTitles";
import useGetAllAdminGalleryImages from "../hooks/useGetAllAdminGalleryImages";
import AdminGalleryImages from "./AdminGalleryImages";
import { useLocation } from "react-router-dom";
import useGetAllPublicGaleryTitle from "../hooks/useGetAllPublicGaleryTitle";
import PublicGalleryTitles from "./PublicGalleryTitles";
import useGetAllPublicGalleryImages from "../hooks/useGetAllPublicGaleryImage";
import PublicGalleryImages from "./PublicGalleryImages";
import MyGalleryTitles from "./MyGalleryTitles";
import useGetAllMyGalleryTitle from "../hooks/useGetAllMyGalleryTitle";
import useGetAllMyGalleryImages from "../hooks/useGetAllMyGalleryImages";
import MyGalleryImages from "./MyGalleryImages";

type Props = {
  type: GetDataType;
};

export default function GetData({ type }: Props) {
  const pathname = useLocation().pathname;
  let query;

  console.log(pathname);
  if (type === "adminUserData") {
    query = useGetAllUsers(pathname);
  } else if (type === "adminGalleryTitles") {
    query = useGetAllAdminGalleryTitle(pathname);
  } else if (type === "adminGalleryImages") {
    query = useGetAllAdminGalleryImages(pathname);
  } else if (type === "publicGalleryTitles") {
    query = useGetAllPublicGaleryTitle(pathname);
  } else if (type === "publicGalleryImages") {
    query = useGetAllPublicGalleryImages(pathname);
  } else if (type === "myGalleryTitles") {
    query = useGetAllMyGalleryTitle(pathname);
  } else if (type === "myGalleryImages") {
    query = useGetAllMyGalleryImages(pathname);
  } else {
    return null; // This case should never happen due to the type definition
  }

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError error={error} />;

  if (!data || data.length === 0) return <EmptyList message={"Nincs adat!"} />;

  return (
    <ul className="gallery-titles-container">
      {data.map((item) => {
        if (type === "adminUserData") {
          return <AdminUsers key={item._id} item={item as UserObjType} />;
        } else if (type === "adminGalleryTitles") {
          return (
            <AdminGalleryTitles
              key={item._id}
              item={item as GalleryTitleType}
            />
          );
        } else if (type === "adminGalleryImages") {
          return (
            <AdminGalleryImages
              key={item._id}
              item={item as GalleryImageType}
            />
          );
        } else if (type === "publicGalleryTitles") {
          return (
            <PublicGalleryTitles
              key={item._id}
              item={item as GalleryTitleType}
            />
          );
        } else if (type === "publicGalleryImages") {
          return (
            <PublicGalleryImages
              key={item._id}
              item={item as GalleryImageType}
            />
          );
        } else if (type === "myGalleryTitles") {
          return (
            <MyGalleryTitles key={item._id} item={item as GalleryTitleType} />
          );
        } else if (type === "myGalleryImages") {
          return (
            <MyGalleryImages key={item._id} item={item as GalleryImageType} />
          );
        } else {
          return null; // This case should never happen due to the earlier checks
        }
      })}
    </ul>
  );
}
