import CustomLink from "../CustomLink/CustomLink";

export default function AuthMenu() {
  return (
    <div className="absolute text-center bottom-12 w-full shadow-lg dark:bg-zinc-800 bg-zinc-100 rounded overflow-hidden">
      <CustomLink to="/auth/login">Bejelentkezés</CustomLink>
      <CustomLink to="/auth/register">Regisztráció</CustomLink>
    </div>
  );
}
