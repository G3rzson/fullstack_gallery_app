import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import GaleryEditItem from "./GaleryEditItem";
import Loader from "../../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";
import axios from "axios";
import type { ResponseType, GaleryTitleType } from "../../../Types/types";
import GaleryLinkItem from "./GaleryLinkItem";

export default function GaleryLinks() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { editingGaleryTitleObj } = useContextProvider();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["galeryTitles"],
    queryFn: async () => {
      const res = await api.get<ResponseType<GaleryTitleType[]>>(
        "/galery/galery-titles/get"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading && location === "/galery" && data?.data.length === 0) {
      navigate("/");
    }
  }, [data, isLoading, location, navigate]);

  if (isError)
    return (
      <div className="flex flex-1 items-center justify-center p-4 dark:text-red-400 text-red-500">
        {axios.isAxiosError(error)
          ? error.response?.data?.message || "Ismeretlen hiba történt!"
          : "Ismeretlen hiba történt!"}
      </div>
    );

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center p-4 ">
        <Loader />
      </div>
    );

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-center">
        Még nincsenek elérhető galériák!
      </div>
    );
  }

  return (
    <ul className="flex-1 overflow-auto pe-1 me-1 dark:dark">
      {data?.data?.map((galeryTitle) =>
        editingGaleryTitleObj?._id === galeryTitle._id ? (
          <GaleryEditItem key={galeryTitle._id} />
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
