import { useLocation } from "react-router-dom";
import type {
  BackendAnswerGaleryTitleType,
  GaleryTitleType,
} from "../../Types/types";
import CustomLink from "../CustomLink/CustomLink";
import ModBtn from "./ModBtn";

type Props = {
  galeryTitle: GaleryTitleType;
  data: BackendAnswerGaleryTitleType;
};

export default function GaleryLinkItem({ galeryTitle, data }: Props) {
  const location = useLocation();
  const activeLink = location.pathname === `/galery/${galeryTitle.url}`;
  return (
    <li className="relative">
      <CustomLink to={`/galery/${galeryTitle.url}`} activeLink={activeLink}>
        {galeryTitle.galeryTitle}
      </CustomLink>

      {activeLink && <ModBtn galeryTitle={galeryTitle} data={data} />}
    </li>
  );
}
