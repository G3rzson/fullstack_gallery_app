import { useParams } from "react-router-dom";
import useGaleryImageGet from "../../Hooks/useGaleryImageGet";
import { useEffect, useState } from "react";
import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import { useContextProvider } from "../../Hooks/useContextProvider";
import DeleteImageBtn from "./DeleteImageBtn";
import ImageNavBtn from "./ImageNavBtn";
import ImagePagination from "./ImagePagination";

export default function ImageSlider() {
  const params = useParams();
  const urlParams = params["url-params"]!;
  const [index, setIndex] = useState(0);
  const { userObj, isAuthLoading } = useContextProvider();

  const { data, isLoading, isError, error } = useGaleryImageGet({ urlParams });

  const galeryImagesArray = data?.data || [];

  useEffect(() => {
    if (index >= galeryImagesArray.length) {
      setIndex(0);
    }
  }, [galeryImagesArray.length, index]);

  const safeIndex = Math.min(index, galeryImagesArray.length - 1);

  const imageObj = galeryImagesArray[safeIndex];

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMsg error={error} />;

  if (galeryImagesArray.length === 0)
    return <EmptyData text="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 w-full items-center justify-center">
      <div className="h-96 relative overflow-hidden rounded-xl group">
        <img
          src={`http://localhost:8000${imageObj.url}`}
          alt={imageObj.filename}
          className="h-full w-auto object-cover object-center rounded-xl mx-auto "
        />
        {!isAuthLoading && imageObj.createdBy === userObj?.username ? (
          <DeleteImageBtn imageObj={imageObj} urlParams={urlParams} />
        ) : null}
      </div>

      <ImageNavBtn
        galeryImagesArray={galeryImagesArray}
        setIndex={setIndex}
        direction="next"
      />

      <ImageNavBtn
        galeryImagesArray={galeryImagesArray}
        setIndex={setIndex}
        direction="prev"
      />

      <ImagePagination
        galeryImagesArray={galeryImagesArray}
        setIndex={setIndex}
        index={index}
      />
    </div>
  );
}
