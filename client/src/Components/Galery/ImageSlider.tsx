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

type Props = { url: string | undefined };

export default function ImageSlider({ url }: Props) {
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError, error } =
    useGetData<BackendAnswerGaleryImagesType>(
      `http://localhost:8000/galery/${url}/images`
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
    <div className="relative m-4 h-[60vh] overflow-hidden flex flex-1 flex-col items-center justify-center">
      <ImageView images={data?.images} index={index} />

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
