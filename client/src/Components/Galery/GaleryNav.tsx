import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

type GaleryTitleType = {
  _id: string;
  galeryTitle: string;
  path: string;
};

type BackendAnswerType = {
  success: boolean;
  galeryTitles: GaleryTitleType[];
};

export default function GaleryNav() {
  const { data, isLoading, isError, error } = useQuery<
    BackendAnswerType,
    unknown
  >({
    queryKey: ["galeryTitles"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:8000/galery/get-galery-titles"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Ismeretlen hiba történt!"
        : "Ismeretlen hiba történt!";

      toast.error(message);
    }
  }, [isError, error]);

  if (isLoading)
    return (
      <div className="w-48 dark:bg-zinc-900 bg-zinc-200 h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  // console.log(data?.galeryTitles);

  return (
    <div className="w-48 dark:bg-zinc-900 bg-zinc-200 h-full">
      <h2 className="text-center py-4 border-b-2 dark:border-zinc-200 border-zinc-800">
        Galéria
      </h2>
      <ul>
        {data?.galeryTitles?.map((g) => (
          <li
            key={g._id}
            className="p-4 border-b-2 dark:border-zinc-200 border-zinc-800"
          >
            {g.galeryTitle}
          </li>
        ))}
      </ul>
    </div>
  );
}
