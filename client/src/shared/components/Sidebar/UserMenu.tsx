import { LogIn, LogOut, NotebookPen, User } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useUserContext } from "../../../context/useUserContext";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useUserLogout } from "./useUserLogout";

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
  const { userObj } = useUserContext();

  function closeDropdown() {
    if (dropdownRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }

    setIsDropdownOpen(false);
  }

  useOutsideClick(menuRef, closeDropdown, isDropdownOpen);
  useEscapeKey(closeDropdown, isDropdownOpen);

  const { setAccessToken, setUserObj } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useUserLogout();

  async function handleLogout() {
    try {
      navigate("/", { replace: true });

      const res = await mutateAsync();

      toast.success(res.message);
      setAccessToken(null);
      setUserObj(null);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Sikertelen bejelentkezés!";

      toast.error(errorMessage);
      console.error("Logout failed:", error);
    } finally {
      closeDropdown();
    }
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        ref={triggerRef}
        className={`user-menu-btn ${isDropdownOpen ? "active" : ""}`}
        title={isSidebarOpen ? undefined : "Felhasználó"}
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
        {userObj ? (
          <>
            <p className="dropdown-user-badge">
              {userObj.username.charAt(0).toUpperCase()}
            </p>
            <p className="dropdown-user-info">{userObj.username}</p>

            <button
              onClick={handleLogout}
              disabled={isPending}
              aria-label="Kijelentkezés"
              className="dropdown-link"
            >
              <LogOut /> Kijelentkezés
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
