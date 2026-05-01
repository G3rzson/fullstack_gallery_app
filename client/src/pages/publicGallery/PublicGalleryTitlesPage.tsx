import GetData from "../../components/GetData";
import Searchbar from "../../components/Searchbar";
import { useSearchContext } from "../../hooks/useSearchContext";

export default function PublicGalleryTitlesPage() {
  const { hasListItem } = useSearchContext();

  return (
    <>
      <h1 className="page-title">Galériák</h1>

      {hasListItem && <Searchbar label="Keresés galéria alapján..." />}

      <GetData type="titleData" />
    </>
  );
}
