import { SidebarClose, SidebarOpen } from "lucide-react";
import { useRef, useState } from "react";
import Nav from "./Nav";
import UserMenu from "./UserMenu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <div
      ref={sidebarRef}
      className={`sidebar-container ${
        isSidebarOpen ? "sidebar-container-open" : "sidebar-container-closed"
      }`}
    >
      <button
        title={isSidebarOpen ? "Oldalsáv bezárása" : "Oldalsáv kinyitása"}
        className={`sidebar-btn ${isSidebarOpen ? "" : "open"}`}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
      </button>

      <Nav isSidebarOpen={isSidebarOpen} />

      <UserMenu
        isSidebarOpen={isSidebarOpen}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
}
