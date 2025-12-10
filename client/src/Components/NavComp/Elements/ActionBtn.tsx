import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { GaleryTitleType } from "../../../Types/types";
import { useContextProvider } from "../../../Hooks/UseContextProvider";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setEditingGaleryTitleObj } = useContextProvider();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete(
        `http://localhost:8000/galery/delete/${galeryTitle._id}`
      );
    },

    onSuccess: () => {
      toast.success("Sikeresen törölve!");
      queryClient.invalidateQueries({ queryKey: ["galeryTitles"] });
      navigate("/");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    },
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
