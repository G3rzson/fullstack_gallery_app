import { useLocation } from "react-router-dom";
import type {
  BackendAnswerGaleryTitleType,
  GaleryTitleType,
} from "../../../Types/types";
import CustomLink from "../../CustomElements/CustomLink";
import MenuBtn from "./MenuBtn";

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

      {activeLink && <MenuBtn galeryTitle={galeryTitle} data={data} />}
    </li>
  );
}
