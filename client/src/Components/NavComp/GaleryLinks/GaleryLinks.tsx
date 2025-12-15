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
  const { pathname } = useLocation();
  const { editingGaleryTitleObj } = useContextProvider();

  // Galéria címek lekérése
  const { data, isLoading, isError, error } = useGaleryTitleGet();

  // Galéria címek tömbje
  const galeryTitleArray = data?.data || [];

  // Ha nincs galéria és a hely jelenleg a /galery, akkor irányítsa át a főoldalra
  useEffect(() => {
    if (
      !isLoading &&
      pathname.startsWith("/galery") &&
      galeryTitleArray.length === 0
    ) {
      navigate("/");
    }
  }, [galeryTitleArray, isLoading, pathname, navigate]);

  // Hiba kezelés
  if (isError) return <ErrorMsg error={error} />;

  // Betöltés kezelés
  if (isLoading) return <Loader />;

  // Üres adat kezelés
  if (galeryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  /* ---------------------------------------------------------------------------------------------------------------------------
     | todo : a galeryLinkitem magassága lekérése js-ben és ha több mint 5 elem van akkor a dropdown menü pozícióját felülírni  |
     --------------------------------------------------------------------------------------------------------------------------- */
  return (
    <ul className="flex-1 overflow-auto pe-1 me-1 dark:dark">
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
