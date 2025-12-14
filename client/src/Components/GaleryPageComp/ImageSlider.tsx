import { useParams } from "react-router-dom";
import useGaleryImageGet from "../../Hooks/useGaleryImageGet";
import { useState } from "react";
import DeleteImageBtn from "./DeleteImageBtn";
import ImageNavBtn from "./ImageNavBtn";
import ImagePagination from "./ImagePagination";
import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ImageSlider() {
  const params = useParams();
  const urlParams = params["url-params"]!;
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } = useGaleryImageGet({ urlParams });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMsg error={error} />;

  if (!data?.data?.length)
    return <EmptyData text="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative ">
        <img
          src={`http://localhost:8000${data.data[index].url}`}
          alt={data.data[index].filename}
          className="h-full w-auto object-contain rounded-xl"
        />

        <DeleteImageBtn
          images={data?.data}
          index={index}
          urlParams={urlParams}
        />
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
