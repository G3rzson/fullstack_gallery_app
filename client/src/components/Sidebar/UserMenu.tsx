import { LogIn, NotebookPen, User } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export default function UserMenu({
  isSidebarOpen,
  isDropdownOpen,
  setIsDropdownOpen,
}: {
  isSidebarOpen: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useOutsideClick(menuRef, () => setIsDropdownOpen(false), isDropdownOpen);
  useEscapeKey(() => setIsDropdownOpen(false), isDropdownOpen);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        className={`user-menu-btn ${isDropdownOpen ? "active" : ""}`}
        title="Felhasználó"
        aria-expanded={isDropdownOpen}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <User />
        <p
          className={`${isSidebarOpen ? "user-title-open" : "user-title-close"}`}
        >
          Felhasználó
        </p>
      </button>

      <div
        className={`dropdown-container ${isDropdownOpen ? "dropdown-open" : "dropdown-closed"}`}
        aria-hidden={!isDropdownOpen}
      >
        <Link
          to="/user/login"
          className={`dropdown-link ${pathname === "/user/login" ? "active" : ""}`}
          tabIndex={isDropdownOpen ? 0 : -1}
          onClick={() => setIsDropdownOpen(false)}
        >
          <LogIn /> Bejelentkezés
        </Link>
        <Link
          to="/user/register"
          className={`dropdown-link ${pathname === "/user/register" ? "active" : ""}`}
          tabIndex={isDropdownOpen ? 0 : -1}
          onClick={() => setIsDropdownOpen(false)}
        >
          <NotebookPen />
          Regisztráció
        </Link>
      </div>
    </div>
  );
}
