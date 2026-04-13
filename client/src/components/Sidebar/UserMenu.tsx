import { User } from "lucide-react";

export default function UserMenu({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  return (
    <button className="user-menu-btn" title="Felhasználó">
      <User />
      <p
        className={`${isSidebarOpen ? "user-title-open" : "user-title-close"}`}
      >
        Felhasználó
      </p>
    </button>
  );
}
