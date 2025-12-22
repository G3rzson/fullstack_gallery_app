import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AuthMenu from "./AuthMenu";
import { IoMdPerson } from "react-icons/io";

export default function AuthComp() {
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const { pathname } = useLocation();
  const authRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowAuthMenu(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (authRef.current && !authRef.current.contains(e.target as Node)) {
        setShowAuthMenu(false);
      }
    }

    if (showAuthMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAuthMenu]);

  return (
    <>
      <div ref={authRef} className="fixed bottom-4 left-4 z-50 w-40 rounded">
        {showAuthMenu && <AuthMenu setShowAuthMenu={setShowAuthMenu} />}
        <button
          onClick={() => setShowAuthMenu((prev) => !prev)}
          aria-label="User menu"
          className="cursor-pointer w-full rounded flex items-center justify-center p-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300"
        >
          <IoMdPerson size={24} />
        </button>
      </div>{" "}
    </>
  );
}
