import { useState } from "react";
import AuthComp from "./Auth/AuthComp";
import { IoExitOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useContextProvider } from "../../Hooks/useContextProvider";

/*---------------------------------------
  | todo: admin felület lefejlesztése   |
  ---------------------------------------*/

export default function NavComp() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { pathname } = useLocation();
  const { userObj } = useContextProvider();

  const userRole = userObj ? userObj.role : "guest";

  return (
    <section
      className={`${
        isNavOpen ? "w-48" : "w-12"
      } h-dvh sm:h-auto sm:static fixed sm:z-0 z-10`}
    >
      <nav className="h-full relative dark:bg-zinc-900/90 bg-zinc-200 flex flex-col justify-between">
        <button
          aria-label={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}
          className={`${
            isNavOpen ? "rotate-y-180 left-39" : "rotate-y-0 left-4"
          } border-none outline-none cursor-pointer fixed top-4 z-50 transition-transform`}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <abbr title={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}>
            <IoExitOutline size={24} />
          </abbr>
        </button>

        {isNavOpen && (
          <div className="h-full flex fixed top-0 z-10 w-48 flex-col justify-between">
            <ul>
              {NAV_LINKS.filter(({ roles }) => roles.includes(userRole)).map(
                ({ to, label }) => {
                  const isActive = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        key={to}
                        className={`${
                          isActive
                            ? "dark:bg-zinc-700 bg-zinc-400"
                            : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
                        } block p-4 duration-300`}
                        to={to}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>

            <AuthComp />
          </div>
        )}
      </nav>
    </section>
  );
}

const NAV_LINKS = [
  {
    to: "/",
    label: "Főoldal",
    roles: ["guest", "user", "admin"],
  },
  {
    to: "/my-galery-titles",
    label: "Saját galériák",
    roles: ["user", "admin"],
  },
  {
    to: "/admin",
    label: "Admin felület",
    roles: ["admin"],
  },
];
