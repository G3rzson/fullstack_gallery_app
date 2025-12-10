import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { BackendAnswerGaleryImagesType } from "../../Types/types";
import FetchError from "../../Components/CustomElements/FetchResultError";
import FetchEmpty from "../../Components/CustomElements/FetchResultEmpty";
import CustomLoader from "../../Components/CustomElements/CustomLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ImageView from "../../Components/GaleryPageComp/ImageView";
import ImageNavBtn from "../../Components/GaleryPageComp/ImageNavBtn";
import DeleteImage from "../../Components/GaleryPageComp/DeleteImage";
import ImagePagination from "../../Components/GaleryPageComp/ImagePagination";

export default function GaleryImageSlider() {
  const { url } = useParams<{ url: string }>();
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } =
    useQuery<BackendAnswerGaleryImagesType>({
      queryKey: [`galeryImages-${url}`],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:8000/galery/${url}/images`
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

  if (isError && errorMessage)
    return <FetchError errorMessage={errorMessage} />;

  if (isLoading) return <CustomLoader />;

  if (!data?.images || data?.images.length === 0)
    return <FetchEmpty message="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative ">
        <ImageView images={data?.images} index={index} />

        <DeleteImage images={data?.images} index={index} url={url} />
      </div>

      <ImageNavBtn images={data?.images} setIndex={setIndex} direction="next">
        <FaArrowAltCircleRight />
      </ImageNavBtn>

      <ImageNavBtn images={data?.images} setIndex={setIndex} direction="prev">
        <FaArrowAltCircleLeft />
      </ImageNavBtn>

      <ImagePagination
        images={data?.images}
        setIndex={setIndex}
        index={index}
      />
    </div>
  );
}
