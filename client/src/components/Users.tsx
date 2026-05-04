import { Link, useLocation } from "react-router-dom";
import type { UserObjType } from "../types/types";
import DeleteAccountBtn from "./DeleteAccountBtn";
import { Trash2 } from "lucide-react";

export default function Users({ item }: { item: UserObjType }) {
  const pathname = useLocation().pathname;

  return (
    <li className="gallery-titles group">
      <Link className="gallery-title-link" to={`${pathname}/${item._id}`}>
        <h3>{item.username}</h3>
        <p>{item.role}</p>
      </Link>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <DeleteAccountBtn userId={item._id}>
          <Trash2 />
        </DeleteAccountBtn>
      </div>
    </li>
  );
}
