import GetData from "../../components/GetData";
import Searchbar from "../../components/Searchbar";

export default function PublicGalleryTitlesPage() {
  return (
    <>
      <h1 className="page-title">Galériák</h1>

      <Searchbar label="Keresés galéria alapján..." />

      <GetData type="titleData" />
    </>
  );
}
