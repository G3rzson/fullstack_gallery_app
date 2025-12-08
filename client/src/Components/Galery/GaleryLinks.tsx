import { useLocation } from "react-router-dom";
import type { BackendAnswerGaleryTitleType } from "../../Types/types";
import CustomLink from "../CustomLink/CustomLink";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import FetchLoader from "../Fetch/FetchLoader";
import FetchError from "../Fetch/FetchError";
import FetchEmpty from "../Fetch/FetchEmpty";
import { handleErrorMessage } from "../../Functions/handleErrorMessage";
import { useGetData } from "../../Hooks/useGetData";

export default function GaleryLinks() {
  const location = useLocation();

  const { data, isLoading, isError, error } =
    useGetData<BackendAnswerGaleryTitleType>(
      "http://localhost:8000/galery/get-galery-titles"
    );

  const errorMessage = handleErrorMessage(isError, error);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  if (isError && errorMessage)
    return <FetchError errorMessage={errorMessage} />;

  if (isLoading) return <FetchLoader />;

  if (!data?.galeryTitles || data.galeryTitles.length === 0)
    return <FetchEmpty message="Nincsenek elérhető galériák!" />;

  return (
    <ul className="overflow-auto">
      {data?.galeryTitles?.map((galeryTitle) => {
        return (
          <li key={galeryTitle._id}>
            <CustomLink
              to={`/galery/${galeryTitle.url}`}
              activeLink={location.pathname === `/galery/${galeryTitle.url}`}
            >
              {galeryTitle.galeryTitle}
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
}
