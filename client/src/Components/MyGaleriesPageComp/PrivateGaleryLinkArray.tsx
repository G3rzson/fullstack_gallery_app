import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import usePrivateGaleryTitleGet from "../../Hooks/usePrivateGaleryTitleGet";

export default function PrivateGaleryLinkArray() {
  const { data, isLoading, isError, error } = usePrivateGaleryTitleGet();

  const privateGaleryTitleArray = data?.data || [];

  if (isError) return <ErrorMsg error={error} />;

  if (isLoading) return <Loader />;

  if (privateGaleryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex flex-row flex-wrap justify-center gap-4 max-h-[40vh] sm:max-h-[40vh] overflow-y-auto dark:dark">
      {privateGaleryTitleArray.map((galeryTitleObj) => (
        <li
          className="sm:w-40 w-30 sm:h-40 h-30 relative dark:bg-zinc-900 bg-zinc-200 rounded-xl"
          key={galeryTitleObj._id}
        >
          <Link
            className="w-full h-full"
            to={`/private/galery/${galeryTitleObj.url}`}
          >
            <CiImageOn className="sm:w-40 w-30 sm:h-40 h-30" />
            <span className="block text-center p-4 absolute bottom-0 w-full dark:bg-zinc-900/90 bg-zinc-200/90 rounded-b-xl">
              {galeryTitleObj.galeryTitle}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
