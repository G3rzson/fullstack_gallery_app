import { Link, useLocation } from "react-router-dom";
import type { UserObjType } from "../types/types";

export default function AdminUsers({ item }: { item: UserObjType }) {
  const pathname = useLocation().pathname;

  return (
    <li className="gallery-titles">
      <Link className="gallery-title-link" to={`${pathname}/${item._id}`}>
        <h3>{item.username}</h3>
        <p>{item.role}</p>
      </Link>
    </li>
  );
}
