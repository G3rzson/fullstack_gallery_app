import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import { Link, useLocation } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import useGaleryTitleGet from "../../Hooks/useGaleryTitleGet";
import DropdownMenu from "./DropdownMenu";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------
   |  todo: átalakitani hogy a mode-ot url-ből vegye    |
   ------------------------------------------------------  */

type Props = {
  mode: "public" | "private";
};

export default function GaleryLinkArray({ mode }: Props) {
  const { data, isLoading, isError, error } = useGaleryTitleGet(mode);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLLIElement | null>(null);
  const { pathname } = useLocation();

  const showDropdown = pathname === "/my-galery-titles";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuId &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const galeryTitleArray = data?.data || [];

  if (isError) return <ErrorMsg error={error} />;

  if (isLoading) return <Loader />;

  if (galeryTitleArray.length === 0)
    return <EmptyData text={"Még nincsenek elérhető galériák!"} />;

  return (
    <ul className="flex flex-row flex-wrap items-start sm:justify-start justify-center gap-4">
      {galeryTitleArray.map((galeryTitleObj) => (
        <li
          key={galeryTitleObj._id}
          ref={openMenuId === galeryTitleObj._id ? menuRef : null}
          className="relative lg:w-60 lg:h-60 sm:h-45 sm:w-45 w-30 h-30 dark:bg-indigo-950 bg-indigo-200 rounded overflow-hidden"
        >
          <Link
            className="w-full h-full block"
            to={`/galery/${galeryTitleObj.url}`}
          >
            <CiImageOn className="lg:w-60 lg:h-60 sm:h-45 sm:w-45 w-30 h-30" />
            <div className="absolute bottom-0 lg:p-4 sm:p-3 p-2 text-[10px] sm:text-sm lg:text-[16px] w-full backdrop-blur-lg">
              <p className="text-left">{galeryTitleObj.galeryTitle}</p>
              <p className="text-right">{galeryTitleObj.createdBy}</p>
            </div>
          </Link>

          {showDropdown && (
            <button
              className="absolute top-2 right-0 z-20 cursor-pointer duration-300  text-zinc-500 hover:text-black dark:hover:text-white"
              aria-label="Galéria műveletek megjelenítése"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId((prev) =>
                  prev === galeryTitleObj._id ? null : galeryTitleObj._id
                );
              }}
            >
              <HiDotsVertical size={20} />
            </button>
          )}

          {openMenuId === galeryTitleObj._id && (
            <DropdownMenu galeryTitleObj={galeryTitleObj} />
          )}
        </li>
      ))}
    </ul>
  );
}
