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
    <nav
      className={`${
        isNavOpen ? "w-48" : "w-0"
      } h-dvh sm:h-auto sm:static fixed sm:z-0 z-30 dark:bg-indigo-950/70 bg-indigo-200/70 backdrop-blur-md`}
    >
      <SidebarBtn
        isNavOpen={isNavOpen}
        onToggle={() => setIsNavOpen((prev) => !prev)}
      />

      {isNavOpen && (
        <div>
          <NavLinks />
          <AuthComp />
        </div>
      )}
    </nav>
  );
}
