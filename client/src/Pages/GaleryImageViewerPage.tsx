import { Link, useParams } from "react-router-dom";
import { useContextProvider } from "../Hooks/useContextProvider";
import useGaleryTitleGet from "../Hooks/useGaleryTitleGet";
import ImageSlider from "../Components/GlobalComponents/ImageSlider";

export default function GaleryImageViewerPage() {
  const params = useParams();
  const urlParams = params["url-params"]!;

  const { userObj, isAuthLoading } = useContextProvider();

  const { data: publicTitlesData } = useGaleryTitleGet("public");
  const { data: privateTitlesData } = useGaleryTitleGet("private");

  const galeryTitleArray = [
    ...(publicTitlesData?.data ?? []),
    ...(privateTitlesData?.data ?? []),
  ];
  const activeGalery = galeryTitleArray.find((g) => g.url === urlParams);

  const canUploadImages =
    !isAuthLoading &&
    !!userObj &&
    (userObj.role === "admin" || activeGalery?.createdBy === userObj.username);

  return (
    <div className="flex flex-1 flex-col items-center gap-4 p-4">
      <h1 className="text-3xl text-center">{urlParams}</h1>

      {canUploadImages ? (
        <Link
          to={`/galery/image/upload/${urlParams}`}
          className="text-center rounded bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 w-full py-2 duration-300 cursor-pointer"
        >
          Képek feltöltése a galériába
        </Link>
      ) : null}

      <ImageSlider />
    </div>
  );
}
