import { useState } from "react";
import type { BackendAnswerGaleryImagesType } from "../../Types/types";
import FetchError from "../../Components/CustomElements/FetchResultError";
import FetchEmpty from "../../Components/CustomElements/FetchResultEmpty";
import CustomLoader from "../../Components/CustomElements/CustomLoader";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ImageView from "../../Components/GaleryPageComp/ImageView";
import ImageNavBtn from "../../Components/GaleryPageComp/ImageNavBtn";
import DeleteImage from "../../Components/GaleryPageComp/DeleteImage";
import ImagePagination from "../../Components/GaleryPageComp/ImagePagination";
import UseGetMutation from "../../Hooks/UseGetMutation";

export default function GaleryImageSlider() {
  const { "url-params": urlParams } = useParams<{ "url-params": string }>();
  //console.log(urlParams);
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } =
    UseGetMutation<BackendAnswerGaleryImagesType>({
      queryKey: `galeryImages-${urlParams}`,
      url: `http://localhost:8000/galery/${urlParams}/images`,
    });

  if (isError) return <FetchError error={error} />;

  if (isLoading) return <CustomLoader />;

  if (!data?.images || data?.images.length === 0)
    return <FetchEmpty message="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative ">
        <ImageView images={data?.images} index={index} />

        <DeleteImage
          images={data?.images}
          index={index}
          urlParams={urlParams}
        />
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
