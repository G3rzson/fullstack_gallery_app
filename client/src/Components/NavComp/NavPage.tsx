import GaleryLinks from "./GaleryLinks/GaleryLinks";
import GaleryTitleForm from "./GaleryTitleForm/GaleryTitleForm";
import Auth from "./Auth/Auth";
import HomeLink from "./HomeLink/HomeLink";

export default function NavPage() {
  return (
    <nav className="w-48 h-screen dark:bg-zinc-900 bg-zinc-200 flex flex-col justify-between">
      <HomeLink />

      <GaleryTitleForm />

      <GaleryLinks />

      <Auth />
    </nav>
  );
}
