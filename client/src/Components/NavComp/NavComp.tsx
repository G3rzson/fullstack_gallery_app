import { useState } from "react";
import AuthComp from "./Auth/AuthComp";
import SidebarBtn from "./SidebarBtn";
import NavLinks from "./NavLinks";

/*---------------------------------------
  | todo: admin felület lefejlesztése   |
  ---------------------------------------*/

export default function NavComp() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <section
      className={`${
        isNavOpen ? "w-48" : "w-12"
      } dark:bg-indigo-950/70 bg-indigo-200/70 backdrop-blur-md h-dvh sm:h-auto sm:static fixed sm:z-0 z-30`}
    >
      <div className="flex flex-col justify-between h-dvh sticky top-0">
        <nav className="relative">
          <SidebarBtn
            isNavOpen={isNavOpen}
            onToggle={() => setIsNavOpen((prev) => !prev)}
          />

          {isNavOpen && <NavLinks />}
        </nav>
        {isNavOpen && <AuthComp />}
      </div>
    </section>
  );
}
