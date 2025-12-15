import { useParams } from "react-router-dom";
import useGaleryImageGet from "../../Hooks/useGaleryImageGet";
import { useEffect, useState } from "react";
import DeleteImageBtn from "./DeleteImageBtn";
import ImageNavBtn from "./ImageNavBtn";
import ImagePagination from "./ImagePagination";
import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";

export default function ImageSlider() {
  const params = useParams();
  const urlParams = params["url-params"]!;
  const [index, setIndex] = useState(0);

  // galéria képek lekérése
  const { data, isLoading, isError, error } = useGaleryImageGet({ urlParams });

  // galéria képek tömbje
  const galeryImagesArray = data?.data || [];

  // biztonsági ellenőrzés az indexre, ha a képek száma változik
  useEffect(() => {
    if (index >= galeryImagesArray.length) {
      setIndex(0);
    }
  }, [galeryImagesArray.length, index]);

  // biztonságos index a képekhez
  const safeIndex = Math.min(index, galeryImagesArray.length - 1);
  // aktuális kép
  const imageObj = galeryImagesArray[safeIndex];

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMsg error={error} />;

  if (galeryImagesArray.length === 0)
    return <EmptyData text="Nincsenek elérhető képek a galériában!" />;

  /*-----------------------------------------------
    | todo : kép megjelenítés magasság beállítása |
    ----------------------------------------------- */

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="h-80 group relative p-4">
        <img
          src={`http://localhost:8000${imageObj.url}`}
          alt={imageObj.filename}
          className="h-full w-auto object-contain"
        />
        <DeleteImageBtn imageObj={imageObj} urlParams={urlParams} />
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
