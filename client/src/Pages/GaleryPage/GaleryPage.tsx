import GaleryImageSlider from "./GaleryImageSlider";
import GaleryImageForm from "./GaleryImageForm";

export default function Galery() {
  return (
    <div className="flex flex-1 flex-col">
      <GaleryImageForm />

      <GaleryImageSlider />
    </div>
  );
}
