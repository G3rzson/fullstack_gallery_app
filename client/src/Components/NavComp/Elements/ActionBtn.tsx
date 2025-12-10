import type { GaleryTitleType } from "../../../Types/types";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import UseDeleteMutation from "../../../Hooks/UseDeleteMutation";

type Props = {
  children: React.ReactNode;
  type: "edit" | "delete";
  galeryTitle: GaleryTitleType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionBtn({
  children,
  type,
  galeryTitle,
  setIsOpen,
}: Props) {
  const { setEditingGaleryTitleObj } = useContextProvider();

  const deleteMutation = UseDeleteMutation({
    queryKey: "galeryTitles",
    url: `http://localhost:8000/galery/delete/${galeryTitle._id}`,
    withNavigation: true,
  });

  function handleClick() {
    if (type === "delete") {
      deleteMutation.mutate();
    }

    if (type === "edit") {
      setEditingGaleryTitleObj(galeryTitle);
    }

    setIsOpen(false);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 duration-300"
    >
      {children}
    </button>
  );
}
