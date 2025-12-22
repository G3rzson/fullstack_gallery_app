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
      <div
        ref={authRef}
        className="fixed bottom-0 w-40 dark:bg-zinc-800 bg-zinc-100 hover:dark:bg-zinc-700 hover:bg-zinc-300 duration-300 m-4 rounded"
      >
        {showAuthMenu && <AuthMenu setShowAuthMenu={setShowAuthMenu} />}
        <button
          onClick={() => setShowAuthMenu((prev) => !prev)}
          aria-label="User menu"
          className="cursor-pointer text-zinc-800 dark:text-zinc-200 w-full flex items-center justify-center p-2"
        >
          <IoMdPerson size={24} />
        </button>
      </div>{" "}
    </>
  );
}
