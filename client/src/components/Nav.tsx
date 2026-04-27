import { Home, Image, Images } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "Galériák", path: "/public-gallery-titles", icon: <Images /> },
  { title: "Saját galériák", path: "/my-gallery-titles", icon: <Image /> },
];

export default function Nav({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pathname } = useLocation();
  return (
    <nav className="mt-10">
      <ul>
        {NAV_LINKS.map(({ title, path, icon }) => {
          const activeLink = pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                title={isSidebarOpen ? undefined : title}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex flex-row items-center w-full justify-start gap-3 p-2 dark:hover:bg-pink-900 hover:bg-pink-200 transition-colors duration-300 ${activeLink ? "dark:bg-pink-900 bg-pink-200" : ""}`}
              >
                <span className="w-6 flex items-center justify-center">
                  {icon}
                </span>

                <span
                  className={`${isSidebarOpen ? "w-full" : "w-0"} text-nowrap transition-width duration-300 overflow-hidden`}
                >
                  {title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
