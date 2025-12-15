import { Link, useLocation } from "react-router-dom";
import type { GaleryTitleType } from "../../../Types/types";
import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import DropdownMenu from "./DropdownMenu";

type Props = {
  galeryTitleObj: GaleryTitleType;
  galeryTitleArray: GaleryTitleType[];
};

export default function GaleryLinkItem({
  galeryTitleObj,
  galeryTitleArray,
}: Props) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const activeLink = pathname === `/galery/${galeryTitleObj.url}`;

  // Route váltáskor DropdownMenu bezár
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Outside clickre DropdownMenu bezár
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // Ha a kattintás az DropdownMenu-n kívül történt bezárja az DropdownMenu-t
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Csak akkor figyelje az eseményt, ha az dropdown nyitva van
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Takarítás, minden esetben eltávolítja az eseményfigyelőt
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <li className="relative">
      <Link
        className={`${
          activeLink
            ? "dark:bg-zinc-700 bg-zinc-400"
            : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
        } block p-4 duration-300`}
        to={`/galery/${galeryTitleObj.url}`}
      >
        {galeryTitleObj.galeryTitle}
      </Link>

      {activeLink && (
        <>
          {isOpen && (
            <DropdownMenu
              galeryTitleObj={galeryTitleObj}
              setIsOpen={setIsOpen}
              galeryTitleArray={galeryTitleArray}
              dropdownRef={dropdownRef}
            />
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 duration-300"
          >
            <HiDotsVertical />
          </button>
        </>
      )}
    </li>
  );
}
