import useProtection from "../../hooks/useProtection";
import PageLoader from "../../components/PageLoader";
import GetData from "../../components/GetData";
import Searchbar from "../../components/Searchbar";
import { useSearchContext } from "../../hooks/useSearchContext";

export default function AdminGalleryTitlesPage() {
  const { isLoading } = useProtection({ type: "admin" });
  const { hasListItem } = useSearchContext();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <h1 className="page-title">Galériák</h1>

      {hasListItem && <Searchbar label="Keresés galéria alapján..." />}

      <GetData type="titleData" />
    </>
  );
}
