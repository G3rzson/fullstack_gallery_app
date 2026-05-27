import { SidebarClose, SidebarOpen } from "lucide-react";
import { useRef } from "react";
import Nav from "./Nav";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useEscapeKey } from "../hooks/useEscapeKey";
import UserMenu from "./UserMenu";
import { useSidebarContext } from "../hooks/useSidebarContext";

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, isDropdownOpen, setIsDropdownOpen } =
    useSidebarContext();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(
    sidebarRef,
    () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
        return;
      }

      setIsSidebarOpen(false);
    },
    isSidebarOpen || isDropdownOpen,
  );

  useEscapeKey(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return;
    }

    setIsSidebarOpen(false);
  }, isSidebarOpen || isDropdownOpen);

  return (
    // w-10 - 40px => sidebar closed width if you want to change the closed width, change this and the ms-10 on main in App.tsx
    <div
      ref={sidebarRef}
      className={`dark:bg-fuchsia-950 bg-fuchsia-300 border-r-2 z-10 dark:border-fuchsia-700 border-fuchsia-500 absolute top-0 left-0 h-dvh transition-width duration-300 ${
        isSidebarOpen ? "w-75" : "w-10"
      }`}
    >
      <button
        title={isSidebarOpen ? "Oldalsáv bezárása" : "Oldalsáv kinyitása"}
        className="absolute top-2 right-2"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
      </button>

      <Nav />

      <UserMenu />
    </div>
  );
}
