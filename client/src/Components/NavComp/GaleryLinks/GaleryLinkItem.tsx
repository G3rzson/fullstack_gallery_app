import { Link, useLocation } from "react-router-dom";
import type { ResponseType, GaleryTitleType } from "../../../Types/types";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import DropdownMenu from "./DropdownMenu";

type Props = {
  galeryTitleObj: GaleryTitleType;
  data: ResponseType<GaleryTitleType[]>;
};

export default function GaleryLinkItem({ galeryTitleObj, data }: Props) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const activeLink = pathname === `/galery/${galeryTitleObj.url}`;
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
              data={data}
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
