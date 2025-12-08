import { IoMdPerson } from "react-icons/io";
import { useLocation } from "react-router-dom";
import AuthMenu from "./AuthMenu";
import { useEffect, useState } from "react";

export default function Authentication() {
  const pathName = useLocation().pathname;
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  useEffect(() => {
    if (pathName.startsWith("/")) {
      setShowAuthMenu(false);
    }
  }, [pathName, setShowAuthMenu]);

  return (
    <div className="relative dark:bg-zinc-800 bg-zinc-100 m-4 rounded">
      {showAuthMenu && <AuthMenu />}

      <button
        onClick={() => setShowAuthMenu(!showAuthMenu)}
        className="cursor-pointer text-zinc-800 dark:text-zinc-200 w-full flex items-center justify-center p-2"
      >
        <IoMdPerson size={24} />
      </button>
    </div>
  );
}
