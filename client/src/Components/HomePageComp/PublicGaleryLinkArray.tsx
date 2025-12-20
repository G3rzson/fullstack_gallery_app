import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import usePublicGaleryTitleGet from "../../Hooks/usePublicGaleryTitleGet";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";

export default function PublicGaleryLinkArray() {
  const { data, isLoading, isError, error } = usePublicGaleryTitleGet();

  const publicGaleryTitleArray = data?.data || [];

  if (isError) return <ErrorMsg error={error} />;

  if (isLoading) return <Loader />;

  if (publicGaleryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex flex-row flex-wrap justify-center gap-4 max-h-[40vh] sm:max-h-[70vh] overflow-y-auto dark:dark">
      {publicGaleryTitleArray.map((galeryTitleObj) => (
        <li
          className="sm:w-40 w-30 sm:h-40 h-30 relative dark:bg-zinc-900 bg-zinc-200 rounded-xl"
          key={galeryTitleObj._id}
        >
          <Link
            className="w-full h-full"
            to={`/public/galery/${galeryTitleObj.url}`}
          >
            <CiImageOn className="  sm:w-40 w-30 sm:h-40 h-30" />
            <div className="p-2  absolute bottom-0 w-full dark:bg-zinc-900/90 bg-zinc-200/90 rounded-b-xl">
              <p className="text-sm text-left">{galeryTitleObj.galeryTitle}</p>
              <p className="text-sm text-right">{galeryTitleObj.createdBy}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
