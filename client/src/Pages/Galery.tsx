import { useParams } from "react-router-dom";
import GaleryImageForm from "../../../GaleryImageForm";
import ImageSlider from "../Components/Galery/ImageSlider";

export default function Galery() {
  const { url } = useParams<{ url: string }>();
  return (
    <div className="flex flex-1 flex-col">
      <GaleryImageForm url={url} />

      <ImageSlider url={url} />
    </div>
  );
}
