import type { BackendAnswerGaleryTitleType } from "../../../Types/types";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import FetchError from "../../CustomElements/FetchResultError";
import FetchEmpty from "../../CustomElements/FetchResultEmpty";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import GaleryEditItem from "./GaleryEditItem";
import GaleryLinkItem from "./GaleryLinkItem";
import CustomLoader from "../../CustomElements/CustomLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function GaleryLinks() {
  const navigate = useNavigate();
  const { editingGaleryTitleObj } = useContextProvider();

  const { data, isLoading, isError, error } =
    useQuery<BackendAnswerGaleryTitleType>({
      queryKey: ["galeryTitles"],
      queryFn: async () => {
        const res = await axios.get(
          "http://localhost:8000/galery/get-galery-titles"
        );
        return res.data;
      },
    });

  const errorMessage =
    isError && axios.isAxiosError(error)
      ? error.response?.data?.message || "Ismeretlen hiba történt!"
      : isError
      ? "Ismeretlen hiba történt!"
      : null;

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (
      !isLoading &&
      location.pathname === "/galery" &&
      data?.galeryTitles?.length === 0
    ) {
      navigate("/");
    }
  }, [data, isLoading, navigate]);

  if (isError && errorMessage)
    return <FetchError errorMessage={errorMessage} />;

  if (isLoading) return <CustomLoader />;

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
