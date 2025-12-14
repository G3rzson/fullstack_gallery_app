import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import GaleryUpdateForm from "./GaleryUpdateForm";
import Loader from "../../GlobalComponents/Loader";
import GaleryLinkItem from "./GaleryLinkItem";
import ErrorMsg from "../../GlobalComponents/ErrorMsg";
import EmptyData from "../../GlobalComponents/EmptyData";
import useGaleryTitleGet from "../../../Hooks/useGaleryTitleGet";

export default function GaleryLinks() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { editingGaleryTitleObj } = useContextProvider();

  // Galéria címek lekérése
  const { data, isLoading, isError, error } = useGaleryTitleGet();

  // Ha nincs galéria és a hely jelenleg a /galery, akkor irányítsa át a főoldalra
  useEffect(() => {
    if (!isLoading && location === "/galery" && data?.data.length === 0) {
      navigate("/");
    }
  }, [data, isLoading, location, navigate]);

  // Hiba kezelés
  if (isError) return <ErrorMsg error={error} />;

  // Betöltés kezelés
  if (isLoading) return <Loader />;

  // Üres adat kezelés
  if (!data?.data?.length)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex-1 overflow-auto pe-1 me-1 dark:dark">
      {data.data.map((galeryTitleObj) =>
        editingGaleryTitleObj?._id === galeryTitleObj._id ? (
          <GaleryUpdateForm key={galeryTitleObj._id} />
        ) : (
          <GaleryLinkItem
            key={galeryTitleObj._id}
            galeryTitleObj={galeryTitleObj}
            data={data}
          />
        )
      )}
    </ul>
  );
}
