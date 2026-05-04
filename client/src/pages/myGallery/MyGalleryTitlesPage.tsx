import { Link, useLocation } from "react-router-dom";
import useProtection from "../../hooks/useProtection";
import PageLoader from "../../components/PageLoader";
import GetData from "../../components/GetData";
import Searchbar from "../../components/Searchbar";

export default function MyGalleryTitlesPage() {
  const { isLoading } = useProtection({ type: "protected" });
  const pathname = useLocation().pathname;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <h1 className="page-title">Saját galériák</h1>

      <Link to={`${pathname}/create`} className="submit-btn mt-4">
        Új galéria létrehozása
      </Link>

      <Searchbar label="Keresés galéria alapján..." />

      <GetData type="titleData" />
    </>
  );
}
