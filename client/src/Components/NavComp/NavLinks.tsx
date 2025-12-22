import { Link, useLocation } from "react-router-dom";
import { useContextProvider } from "../../Hooks/useContextProvider";

export default function NavLinks() {
  const { pathname } = useLocation();
  const { userObj } = useContextProvider();

  const userRole = userObj ? userObj.role : "guest";
  return (
    <ul className="flex flex-col">
      {NAV_LINKS.filter(({ roles }) => roles.includes(userRole)).map(
        ({ to, label }) => {
          const isActive = pathname === to;
          return (
            <li key={to}>
              <Link
                key={to}
                className={`${
                  isActive
                    ? "dark:bg-zinc-700 bg-zinc-300"
                    : "dark:hover:bg-zinc-600 hover:bg-zinc-400"
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
