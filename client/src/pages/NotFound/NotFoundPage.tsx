import { Link } from "react-router-dom";
import PageTitle from "../../shared/components/PageTitle/PageTitle";
import { ArrowBigLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="centered-container">
      <PageTitle>404 | Oldal nem található</PageTitle>
      <Link to="/" className="error-link">
        <ArrowBigLeft /> Vissza a főoldalra
      </Link>
    </div>
  );
}
