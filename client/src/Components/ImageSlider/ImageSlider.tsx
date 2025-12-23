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
import ImageModal from "./ImageModal";

/*-------------------------------------------------------------------
  | todo: oldal frissitéskor hamarabb kapok 404 hibát majd a képet  |
  ------------------------------------------------------------------- */

export default function ImageSlider() {
  const params = useParams();
  const { "url-params": urlParams } = params;
  const [index, setIndex] = useState(0);
  const { userObj, isAuthLoading } = useContextProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useGaleryImageGet({ urlParams });

  const galeryImagesArray = data?.data || [];

  useEffect(() => {
    if (index >= galeryImagesArray.length) {
      setIndex(0);
    }
  }, [galeryImagesArray.length, index]);

  const imageObj = galeryImagesArray[index] ?? galeryImagesArray[0];

  useEffect(() => {
    if (isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setIndex(
          (i) => (i - 1 + galeryImagesArray.length) % galeryImagesArray.length
        );
      }

      if (event.key === "ArrowRight") {
        setIndex((i) => (i + 1) % galeryImagesArray.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, galeryImagesArray.length]);

  if (!urlParams) {
    return <ErrorMsg error="Hiányzó URL paraméter" />;
  }

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMsg error={error} />;

  if (galeryImagesArray.length === 0)
    return <EmptyData text="Nincsenek elérhető képek a galériában!" />;

  return (
    <div className="relative flex flex-1 w-full items-center justify-center">
      {isModalOpen && (
        <ImageModal onClose={() => setIsModalOpen(false)} imageObj={imageObj} />
      )}

      <div className="h-96 relative overflow-hidden rounded-xl group">
        <img
          src={`http://localhost:8000${imageObj.url}`}
          alt={imageObj.filename}
          onClick={() => setIsModalOpen(true)}
          className="h-full w-auto object-cover object-center rounded-xl mx-auto cursor-zoom-in"
        />
        {!isAuthLoading && imageObj.createdBy === userObj?.username ? (
          <DeleteImageBtn imageID={imageObj._id} urlParams={urlParams} />
        ) : null}
      </div>

      <ImageNavBtn
        direction="prev"
        onClick={() =>
          setIndex(
            (i) => (i - 1 + galeryImagesArray.length) % galeryImagesArray.length
          )
        }
      />

      <ImageNavBtn
        direction="next"
        onClick={() => setIndex((i) => (i + 1) % galeryImagesArray.length)}
      />

      <ImagePagination
        galeryImagesArray={galeryImagesArray}
        setIndex={setIndex}
        index={index}
      />
    </div>
  );
}
