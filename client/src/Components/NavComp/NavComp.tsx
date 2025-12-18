import GaleryLinks from "./GaleryLinks/GaleryLinks";
import GaleryTitleForm from "./GaleryTitleForm/GaleryTitleForm";
import { useState } from "react";
import AuthComp from "./Auth/AuthComp";
import { IoExitOutline } from "react-icons/io5";
import { Link, useMatch } from "react-router-dom";

export default function NavComp() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const isActive = !!useMatch("/");

  return (
    <section
      className={`${
        isNavOpen ? "w-48" : "w-12"
      } h-screen sm:static fixed sm:z-0 z-10`}
    >
      <nav className="h-screen relative dark:bg-zinc-900/90 bg-zinc-200 flex flex-col justify-between">
        <button
          aria-label={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}
          className={`${
            isNavOpen ? "rotate-y-180" : "rotate-y-0"
          } border-none outline-none cursor-pointer absolute top-4 right-3 transition-transform`}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <abbr title={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}>
            <IoExitOutline size={24} />
          </abbr>
        </button>

        {isNavOpen && (
          <div className=" h-screen flex flex-col justify-between">
            <Link
              className={`${
                isActive
                  ? "dark:bg-zinc-700 bg-zinc-400"
                  : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
              } block p-4 duration-300`}
              to="/"
            >
              Főoldal
            </Link>

            <GaleryTitleForm />

            <GaleryLinks />

            <AuthComp />
          </div>
        )}
      </nav>
    </section>
  );
}
