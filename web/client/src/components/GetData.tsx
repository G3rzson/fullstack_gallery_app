import EmptyList from "./EmptyList";
import PageLoader from "./PageLoader";
import ServerError from "./ServerError";
import type {
  GalleryImageType,
  GalleryTitleType,
  GetDataType,
  UserObjType,
} from "../types/types";
import Users from "./Users";
import useGetGalleryTitles from "../hooks/useGetGalleryTitles";
import useGetUsers from "../hooks/useGetUsers";
import useGetGalleryImages from "../hooks/useGetGalleryImages";
import GalleryTitles from "./GalleryTitles";
import GalleryImages from "./GalleryImages";

type Props = {
  type: GetDataType;
};

export default function GetData({ type }: Props) {
  let query;

  if (type === "userData") {
    query = useGetUsers();
  } else if (type === "titleData") {
    query = useGetGalleryTitles();
  } else if (type === "imageData") {
    query = useGetGalleryImages();
  } else {
    return null; // This case should never happen due to the type definition
  }

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <PageLoader />;

  if (isError) return <ServerError error={error} />;

  if (!data || data.length === 0) {
    return (
      <EmptyList
        message={
          type === "userData"
            ? "Nincsenek felhasználók!"
            : type === "titleData"
              ? "Nincsenek galériák!"
              : "Nincsenek képek!"
        }
      />
    );
  }

  return (
    <ul className="gallery-titles-container">
      {data.map((item) => {
        if (type === "userData") {
          return <Users key={item._id} item={item as UserObjType} />;
        } else if (type === "titleData") {
          return (
            <GalleryTitles key={item._id} item={item as GalleryTitleType} />
          );
        } else if (type === "imageData") {
          return (
            <GalleryImages key={item._id} item={item as GalleryImageType} />
          );
        } else {
          return null; // This case should never happen due to the earlier checks
        }
      })}
    </ul>
  );
}
