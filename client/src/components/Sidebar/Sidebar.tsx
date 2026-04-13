import { SidebarClose, SidebarOpen } from "lucide-react";
import { useRef, useState } from "react";
import Nav from "./Nav";
import UserMenu from "./UserMenu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(sidebarRef, () => setIsSidebarOpen(false), isSidebarOpen);
  useEscapeKey(() => setIsSidebarOpen(false), isSidebarOpen);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar-container ${
        isSidebarOpen ? "sidebar-container-open" : "sidebar-container-closed"
      }`}
    >
      <button
        title={isSidebarOpen ? "Oldalsáv kinyitása" : "Oldalsáv bezárása"}
        className={`sidebar-btn ${isSidebarOpen ? "" : "open"}`}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <div className="icon-wrapper">
          <span className="icon open-icon">
            <SidebarOpen />
          </span>
          <span className="icon close-icon">
            <SidebarClose />
          </span>
        </div>
      </button>

      <Nav isSidebarOpen={isSidebarOpen} />

      <UserMenu isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
