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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();

  function closeDropdown() {
    if (dropdownRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }

    setIsDropdownOpen(false);
  }

  useOutsideClick(menuRef, closeDropdown, isDropdownOpen);
  useEscapeKey(closeDropdown, isDropdownOpen);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        ref={triggerRef}
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
        ref={dropdownRef}
        className={`dropdown-container ${isDropdownOpen ? "dropdown-open" : "dropdown-closed"}`}
        inert={!isDropdownOpen}
      >
        <Link
          to="/user/login"
          className={`dropdown-link ${pathname === "/user/login" ? "active" : ""}`}
          tabIndex={isDropdownOpen ? 0 : -1}
          onClick={closeDropdown}
        >
          <LogIn /> Bejelentkezés
        </Link>
        <Link
          to="/user/register"
          className={`dropdown-link ${pathname === "/user/register" ? "active" : ""}`}
          tabIndex={isDropdownOpen ? 0 : -1}
          onClick={closeDropdown}
        >
          <NotebookPen />
          Regisztráció
        </Link>
      </div>
    </div>
  );
}
