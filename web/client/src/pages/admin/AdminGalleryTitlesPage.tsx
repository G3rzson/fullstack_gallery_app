import useProtection from "../../hooks/useProtection";
import PageLoader from "../../components/PageLoader";
import GetData from "../../components/GetData";
import Searchbar from "../../components/Searchbar";

export default function AdminGalleryTitlesPage() {
  const { isLoading } = useProtection({ type: "admin" });
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <h1 className="page-title">Galériák</h1>

      <Searchbar label="Keresés galéria alapján..." />

      <GetData type="titleData" />
    </>
  );
}
