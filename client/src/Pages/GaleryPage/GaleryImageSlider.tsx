import { useState } from "react";
import type { GaleryImageType, ResponseType } from "../../Types/types";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ImageView from "../../Components/GaleryPageComp/ImageView";
import ImageNavBtn from "../../Components/GaleryPageComp/ImageNavBtn";
import DeleteImage from "../../Components/GaleryPageComp/DeleteImage";
import ImagePagination from "../../Components/GaleryPageComp/ImagePagination";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export default function GaleryImageSlider() {
  const { "url-params": urlParams } = useParams<{ "url-params": string }>();
  //console.log(urlParams);
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`galeryImages-${urlParams}`],
    queryFn: async () => {
      const res = await api.get<ResponseType<GaleryImageType[]>>(
        `http://localhost:8000/galery/${urlParams}/images`
      );
      return res.data;
    },
  });

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
        Még nincsenek képek a galériában!
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative ">
        <ImageView images={data?.data} index={index} />

        <DeleteImage images={data?.data} index={index} urlParams={urlParams} />
      </div>

      <ImageNavBtn images={data?.data} setIndex={setIndex} direction="next">
        <FaArrowAltCircleRight />
      </ImageNavBtn>

      <ImageNavBtn images={data?.data} setIndex={setIndex} direction="prev">
        <FaArrowAltCircleLeft />
      </ImageNavBtn>

      <ImagePagination images={data?.data} setIndex={setIndex} index={index} />
    </div>
  );
}
