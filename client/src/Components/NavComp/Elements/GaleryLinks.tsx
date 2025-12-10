import type { BackendAnswerGaleryTitleType } from "../../../Types/types";
import { useEffect } from "react";
import FetchError from "../../CustomElements/FetchResultError";
import FetchEmpty from "../../CustomElements/FetchResultEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import GaleryEditItem from "./GaleryEditItem";
import GaleryLinkItem from "./GaleryLinkItem";
import CustomLoader from "../../CustomElements/CustomLoader";
import UseGetMutation from "../../../Hooks/UseGetMutation";

export default function GaleryLinks() {
  const navigate = useNavigate();
  const location = useLocation();
  const { editingGaleryTitleObj } = useContextProvider();

  const { data, isLoading, isError, error } =
    UseGetMutation<BackendAnswerGaleryTitleType>({
      queryKey: "galeryTitles",
      url: "http://localhost:8000/galery/get-galery-titles",
    });

  useEffect(() => {
    if (
      !isLoading &&
      location.pathname === "/galery" &&
      data?.galeryTitles?.length === 0
    ) {
      navigate("/");
    }
  }, [data, isLoading, navigate]);

  if (isError) return <FetchError error={error} />;

  if (isLoading) return <CustomLoader />;

  if (!data?.galeryTitles || data.galeryTitles.length === 0) {
    return <FetchEmpty message="Még nincsenek elérhető galériák!" />;
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
