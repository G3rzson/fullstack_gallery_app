import { Home, Image, Images } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "Galériák", path: "/galleries", icon: <Images /> },
  { title: "Saját galériák", path: "/my-galleries", icon: <Image /> },
];

export default function Nav({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const { pathname } = useLocation();
  return (
    <nav className="sidebar-nav">
      <ul className="nav-list">
        {NAV_LINKS.map(({ title, path, icon }) => {
          const activeLink = pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                title={title}
                className={`nav-link ${activeLink ? "active" : ""}`}
              >
                {icon}
                {title && (
                  <p
                    className={`${isSidebarOpen ? "link-title-open" : "link-title-close"}`}
                  >
                    {title}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
