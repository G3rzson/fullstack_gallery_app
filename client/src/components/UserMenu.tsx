import { LogIn, NotebookPen, Trash2, User } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useEscapeKey } from "../hooks/useEscapeKey";
import LogoutBtn from "./LogoutBtn";
import DeleteAccountBtn from "./DeleteAccountBtn";
import { useSidebarContext } from "../hooks/useSidebarContext";

export default function UserMenu() {
  const { isSidebarOpen, setIsSidebarOpen, isDropdownOpen, setIsDropdownOpen } =
    useSidebarContext();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();
  const { userObj } = useUserContext();

  function closeDropdown() {
    if (dropdownRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }

    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  }

  useOutsideClick(menuRef, closeDropdown, isDropdownOpen);
  useEscapeKey(closeDropdown, isDropdownOpen);

  return (
    <div className="absolute bottom-0 left-0 w-full" ref={menuRef}>
      <button
        ref={triggerRef}
        className={`flex fle-row items-center justify-start gap-3 p-2 w-full rounded cursor-pointer dark:hover:bg-pink-900 hover:bg-pink-200 transition-colors duration-300 ${isDropdownOpen ? "dark:bg-pink-900 bg-pink-200" : ""}`}
        title="Felhasználó"
        aria-expanded={isDropdownOpen}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="w-6 flex items-center justify-center">
          <User />
        </span>
        <span
          className={`overflow-hidden text-start transition-width duration-300 ${isSidebarOpen ? "w-full" : "w-0"}`}
        >
          Felhasználó
        </span>
      </button>

      <div
        ref={dropdownRef}
        className={`absolute bottom-12 left-2 flex flex-col gap-3 z-50 ${isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"} dark:bg-fuchsia-950 bg-fuchsia-300 border-2 dark:border-fuchsia-700 border-fuchsia-500 rounded-xl p-4 w-48 transition-opacity duration-300 z-10`}
      >
        {userObj ? (
          <>
            <p className="w-10 h-10 rounded-full mx-auto bg-pink-500 text-white flex items-center justify-center">
              {userObj.username.charAt(0).toUpperCase()}
            </p>
            <p className="text-xl text-center">{userObj.username}</p>
            <LogoutBtn closeDropdown={closeDropdown} />
            <DeleteAccountBtn userId={userObj._id}>
              <Trash2 /> Fiók törlése
            </DeleteAccountBtn>
          </>
        ) : (
          <>
            <Link
              to="/user/login"
              className={`flex items-center justify-center gap-2 p-2 rounded cursor-pointer dark:hover:bg-pink-900 hover:bg-pink-200 transition-colors duration-300 ${pathname === "/user/login" ? "dark:bg-pink-900 bg-pink-200" : ""}`}
              tabIndex={isDropdownOpen ? 0 : -1}
              onClick={closeDropdown}
            >
              <LogIn /> Bejelentkezés
            </Link>
            <Link
              to="/user/register"
              className={`flex items-center justify-center gap-2 p-2 rounded cursor-pointer dark:hover:bg-pink-900 hover:bg-pink-200 transition-colors duration-300 ${pathname === "/user/register" ? "dark:bg-pink-900 bg-pink-200" : ""}`}
              tabIndex={isDropdownOpen ? 0 : -1}
              onClick={closeDropdown}
            >
              <NotebookPen />
              Regisztráció
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
