import GaleryContent from "../Components/Galery/GaleryContent";
import GaleryNav from "../Components/Galery/GaleryNav";

export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <GaleryNav />
      <GaleryContent />
    </div>
  );
}
