import { Link, useLocation } from "react-router-dom";
import type { ResponseType, GaleryTitleType } from "../../../Types/types";
import MenuBtn from "./MenuBtn";

type Props = {
  galeryTitle: GaleryTitleType;
  data: ResponseType<GaleryTitleType[]>;
};

export default function GaleryLinkItem({ galeryTitle, data }: Props) {
  const location = useLocation().pathname;
  const activeLink = location === `/galery/${galeryTitle.url}`;
  return (
    <li className="relative">
      <Link
        className={`${
          activeLink
            ? "dark:bg-zinc-700 bg-zinc-400"
            : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
        } block p-4 duration-300`}
        to={`/galery/${galeryTitle.url}`}
      >
        {galeryTitle.galeryTitle}
      </Link>

      {activeLink && <MenuBtn galeryTitle={galeryTitle} data={data} />}
    </li>
  );
}
