import { useParams } from "react-router-dom";
import GaleryImageForm from "../../Components/Forms/GaleryImageForm";
import ImageSlider from "../../Components/Galery/ImageSlider";

export default function Galery() {
  const { url } = useParams<{ url: string }>();
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-none">
        <GaleryImageForm url={url} />
      </div>

      <div className="flex-1 min-h-0">
        <ImageSlider url={url} />
      </div>
    </div>
  );
}
