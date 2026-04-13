import { Home, Image, Images } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "Galériák", path: "/galleries", icon: <Images /> },
  { title: "Saját galériák", path: "/my-galleries", icon: <Image /> },
];

export default function Nav({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <nav className="sidebar-nav">
      <ul className="nav-list">
        {NAV_LINKS.map(({ title, path, icon }) => (
          <li key={path}>
            <Link to={path} title={title} className={`nav-link`}>
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
        ))}
      </ul>
    </nav>
  );
}
