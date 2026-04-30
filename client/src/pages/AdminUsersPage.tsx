import useProtection from "../hooks/useProtection";
import PageLoader from "../components/PageLoader";
import Searchbar from "../components/Searchbar";
import GetData from "../components/GetData";

export default function AdminUsersPage() {
  const { isLoading } = useProtection({ type: "admin" });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <h1 className="page-title">Felhasználók</h1>
      <Searchbar label="Keresés felhasználó név alapján..." />

      <GetData type="adminUserData" />
    </>
  );
}
