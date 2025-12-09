import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImagePagination from "./ImagePagination";
import ImageNavBtn from "./ImageNavBtn";
import ImageView from "./ImageView";
import type { BackendAnswerGaleryImagesType } from "../../Types/types";
import FetchLoader from "../Fetch/FetchLoader";
import FetchError from "../Fetch/FetchError";
import FetchEmpty from "../Fetch/FetchEmpty";
import { handleErrorMessage } from "../../Functions/handleErrorMessage";
import { useGetData } from "../../Hooks/useGetData";
import DeleteImage from "./DeleteImage";

export default function ImageSlider({ url }: { url: string | undefined }) {
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } =
    useGetData<BackendAnswerGaleryImagesType>(
      `http://localhost:8000/galery/${url}/images`,
      `galeryImages-${url}`
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

  if (!data?.images || data?.images.length === 0)
    return <FetchEmpty message="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative ">
        <ImageView images={data?.images} index={index} />

        <DeleteImage images={data?.images} index={index} url={url} />
      </div>

      <ImageNavBtn images={data?.images} setIndex={setIndex} direction="prev" />
      <ImageNavBtn images={data?.images} setIndex={setIndex} direction="next" />

      <ImagePagination
        images={data?.images}
        setIndex={setIndex}
        index={index}
      />
    </div>
  );
}
