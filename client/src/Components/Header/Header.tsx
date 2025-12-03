import Authentication from "./Authentication";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="dark:bg-zinc-900 bg-zinc-200 dark:text-zinc-100 text-zinc-800">
      <div className="flex items-center sm:flex-row flex-col justify-between w-full h-full sm:w-4/5 mx-auto ">
        <Navigation />
        <Authentication />
      </div>
    </header>
  );
}
