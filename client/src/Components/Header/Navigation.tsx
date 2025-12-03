import { Link, useLocation } from "react-router-dom";
import { useContextProvider } from "../../Hooks/UseContextProvider";
import { useHideAuthMenu } from "../../Hooks/UseHideAuthMenu";

const NAV_LINKS = [
  { name: "Főoldal", path: "/" },
  { name: "Galéria Létrehozása", path: "/galery/create" },
];

export default function Navigation() {
  const { setShowAuthMenu } = useContextProvider();
  const pathName = useLocation().pathname;
  useHideAuthMenu({ pathName, setShowAuthMenu });

  return (
    <nav className="sm:w-fit w-full">
      <ul className="flex text-center sm:flex-row flex-col sm:w-fit w-full">
        {NAV_LINKS.map(({ name, path }) => {
          const activeLink = pathName === path;
          return (
            <li key={path} className="sm:w-fit w-full">
              <Link
                className={`${
                  activeLink
                    ? "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-100"
                    : ""
                } block sm:w-fit w-full p-4 dark:hover:bg-zinc-200 dark:hover:text-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 duration-300`}
                to={path}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
