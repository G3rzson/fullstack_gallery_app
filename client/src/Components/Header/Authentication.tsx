import { IoMdPerson } from "react-icons/io";
import { useLocation } from "react-router-dom";
import AuthMenu from "./AuthMenu";
import { useContextProvider } from "../../Hooks/UseContextProvider";
import { useHideAuthMenu } from "../../Hooks/UseHideAuthMenu";

export default function Authentication() {
  const { showAuthMenu, setShowAuthMenu } = useContextProvider();
  const pathName = useLocation().pathname;
  useHideAuthMenu({ pathName, setShowAuthMenu });

  return (
    <div className="relative h-full flex items-center justify-center sm:my-0 my-4">
      <button
        onClick={() => setShowAuthMenu(!showAuthMenu)}
        className="cursor-pointer dark:bg-zinc-200 bg-zinc-800 text-zinc-200 dark:text-zinc-800 rounded-full p-2"
      >
        <IoMdPerson size={24} />
      </button>
      {showAuthMenu && <AuthMenu />}
    </div>
  );
}
