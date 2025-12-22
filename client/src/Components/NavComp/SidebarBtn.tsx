import { IoExitOutline } from "react-icons/io5";

type Props = {
  isNavOpen: boolean;
  onToggle: () => void;
};

export default function SidebarBtn({ isNavOpen, onToggle }: Props) {
  return (
    <button
      aria-label={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}
      className={`${
        isNavOpen ? "rotate-y-180 left-39" : "rotate-y-0 left-4"
      } border-none outline-none cursor-pointer fixed top-4 z-50 transition-transform`}
      onClick={onToggle}
    >
      <abbr title={isNavOpen ? "Oldalsáv bezárása" : "Oldalsáv megnyitása"}>
        <IoExitOutline size={24} />
      </abbr>
    </button>
  );
}
