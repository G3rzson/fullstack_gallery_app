import GaleryLinks from "./Elements/GaleryLinks";
import CustomLink from "../CustomElements/CustomLink";
import { useLocation } from "react-router-dom";
import GaleryTitleForm from "./Elements/GaleryTitleForm";
import Authentication from "./Elements/Authentication";

export default function PageNav() {
  const location = useLocation();

  return (
    <nav className="w-48 h-screen dark:bg-zinc-900 bg-zinc-200 flex flex-col justify-between">
      <CustomLink to="/" activeLink={location.pathname === "/"}>
        Főoldal
      </CustomLink>

      <GaleryTitleForm />

      <GaleryLinks />

      <Authentication />
    </nav>
  );
}
