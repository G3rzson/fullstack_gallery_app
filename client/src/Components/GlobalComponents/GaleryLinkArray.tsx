import Loader from "../GlobalComponents/Loader";
import ErrorMsg from "../GlobalComponents/ErrorMsg";
import EmptyData from "../GlobalComponents/EmptyData";
import { Link, useLocation } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import useGaleryTitleGet from "../../Hooks/useGaleryTitleGet";
import DropdownMenu from "./DropdownMenu";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

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
          className="relative sm:w-40 w-30 sm:h-40 h-30 dark:bg-zinc-900 bg-zinc-200 rounded-[5px] overflow-hidden"
        >
          <Link
            className="w-full h-full block"
            to={`/galery/${galeryTitleObj.url}`}
          >
            <CiImageOn className="sm:w-40 w-30 sm:h-40 h-30" />
            <div className="p-2 absolute bottom-0 w-full dark:bg-zinc-900/70 bg-zinc-200/70 backdrop-blur-xs">
              <p className="text-sm text-left">{galeryTitleObj.galeryTitle}</p>
              <p className="text-sm text-right">{galeryTitleObj.createdBy}</p>
            </div>
          </Link>

          {showDropdown && (
            <button
              className="absolute top-0 right-0 z-20 cursor-pointer py-2 px-1 dark:hover:text-green-300 hover:text-green-500 duration-300"
              aria-label="Galéria műveletek megjelenítése"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId((prev) =>
                  prev === galeryTitleObj._id ? null : galeryTitleObj._id
                );
              }}
            >
              <HiDotsVertical size={16} />
            </button>
          )}

          {openMenuId === galeryTitleObj._id && (
            <DropdownMenu
              galeryTitleObj={galeryTitleObj}
              onClose={() => setOpenMenuId(null)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
