import type { BackendAnswerGaleryTitleType } from "../../Types/types";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import FetchLoader from "../Fetch/FetchLoader";
import FetchError from "../Fetch/FetchError";
import FetchEmpty from "../Fetch/FetchEmpty";
import { handleErrorMessage } from "../../Functions/handleErrorMessage";
import { useGetData } from "../../Hooks/useGetData";
import GaleryLinkItem from "./GaleryLinkItem";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../Hooks/UseContextProvider";
import GaleryEditItem from "./GaleryEditItem";

export default function GaleryLinks() {
  const navigate = useNavigate();
  const { editingGaleryTitleObj } = useContextProvider();
  const { data, isLoading, isError, error } =
    useGetData<BackendAnswerGaleryTitleType>(
      "http://localhost:8000/galery/get-galery-titles",
      "galeryTitles"
    );

  const errorMessage = handleErrorMessage(isError, error);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!isLoading && data?.galeryTitles?.length === 0) {
      navigate("/");
    }
  }, [data, isLoading, navigate]);

  if (isError && errorMessage)
    return <FetchError errorMessage={errorMessage} />;

  if (isLoading) return <FetchLoader />;

  if (!data?.galeryTitles || data.galeryTitles.length === 0) {
    return <FetchEmpty message="Nincsenek elérhető galériák!" />;
  }

  return (
    <ul className="flex-1 overflow-auto pe-1 me-1 dark:dark">
      {data?.galeryTitles?.map((galeryTitle) =>
        editingGaleryTitleObj?._id === galeryTitle._id ? (
          <GaleryEditItem key={galeryTitle._id} galeryTitle={galeryTitle} />
        ) : (
          <GaleryLinkItem
            key={galeryTitle._id}
            galeryTitle={galeryTitle}
            data={data}
          />
        )
      )}
    </ul>
  );
}
