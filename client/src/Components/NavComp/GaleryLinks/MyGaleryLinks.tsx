import { useLocation, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useEffect } from "react";
import ErrorMsg from "../../GlobalComponents/ErrorMsg";
import Loader from "../../GlobalComponents/Loader";
import EmptyData from "../../GlobalComponents/EmptyData";
import useMyGaleryTitleGet from "../../../Hooks/useMyGaleryTitleGet";
import GaleryUpdateForm from "./GaleryUpdateForm";
import GaleryLinkItem from "./PublicGaleryLinkItem";

export default function MyGaleryLinks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { editingGaleryTitleObj } = useContextProvider();

  const { data, isLoading, isError, error } = useMyGaleryTitleGet();
  console.log("MyGaleryLinks data:", data);

  const galeryTitleArray = data?.data || [];

  useEffect(() => {
    if (
      !isLoading &&
      pathname.startsWith("/galery") &&
      galeryTitleArray.length === 0
    ) {
      navigate("/");
    }
  }, [galeryTitleArray, isLoading, pathname, navigate]);

  if (isError) return <ErrorMsg error={error} />;

  if (isLoading) return <Loader />;

  if (galeryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex-1 overflow-auto dark:dark">
      {galeryTitleArray.map((galeryTitleObj) =>
        editingGaleryTitleObj?._id === galeryTitleObj._id ? (
          <GaleryUpdateForm key={galeryTitleObj._id} />
        ) : (
          <GaleryLinkItem
            key={galeryTitleObj._id}
            galeryTitleObj={galeryTitleObj}
            galeryTitleArray={galeryTitleArray}
          />
        )
      )}
    </ul>
  );
}
