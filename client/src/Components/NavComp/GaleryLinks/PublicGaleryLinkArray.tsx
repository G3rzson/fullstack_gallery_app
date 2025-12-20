import Loader from "../../GlobalComponents/Loader";
import GaleryLinkItem from "./PublicGaleryLinkItem";
import ErrorMsg from "../../GlobalComponents/ErrorMsg";
import EmptyData from "../../GlobalComponents/EmptyData";
import usePublicGaleryTitleGet from "../../../Hooks/usePublicGaleryTitleGet";

export default function PublicGaleryLinkArray() {
  const { data, isLoading, isError, error } = usePublicGaleryTitleGet();

  const publicGaleryTitleArray = data?.data || [];

  if (isError) return <ErrorMsg error={error} />;

  if (isLoading) return <Loader />;

  if (publicGaleryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex-1 overflow-auto dark:dark">
      {publicGaleryTitleArray.map((galeryTitleObj) => (
        <GaleryLinkItem
          key={galeryTitleObj._id}
          galeryTitleObj={galeryTitleObj}
          galeryTitleArray={publicGaleryTitleArray}
        />
      ))}
    </ul>
  );
}
