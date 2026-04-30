import useProtection from "../hooks/useProtection";
import PageLoader from "../components/PageLoader";
import GetData from "../components/GetData";

export default function AdminGalleryImagePage() {
  const { isLoading } = useProtection({ type: "admin" });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <h1 className="page-title">Galéria Képek</h1>

      <GetData type="adminGalleryImages" />
    </>
  );
}
