import GaleryLinks from "../Galery/GaleryLinks";
import CustomLink from "../CustomLink/CustomLink";
import { useLocation } from "react-router-dom";
import GaleryTitleForm from "../Forms/GaleryTitleForm";
import Authentication from "../Auth/Authentication";

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
