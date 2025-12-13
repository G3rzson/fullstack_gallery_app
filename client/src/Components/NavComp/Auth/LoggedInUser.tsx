import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContextProvider } from "../../../Hooks/UseContextProvider";
import api from "../../../api/api";
import toast from "react-hot-toast";
import axios from "axios";
import type { ResponseType, WithAuthInfoType } from "../../../Types/types";

export default function LoggedInUser() {
  const { setAccessToken, setUser } = useContextProvider();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<ResponseType<WithAuthInfoType>>(
        "http://localhost:8000/auth/logout"
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Sikeres átnevezés!");
      queryClient.invalidateQueries({ queryKey: ["logout"] });
      setAccessToken(data.data?.accessToken || null);
      setUser(data.data?.user || null);
    },

    onError: (error) => {
      toast.error(
        `${
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ismeretlen hiba történt!"
            : "Ismeretlen hiba történt!"
        }`
      );
    },
  });

  return (
    <div className="absolute text-center bottom-12 w-full shadow-lg dark:bg-zinc-800 bg-zinc-100 rounded overflow-hidden">
      <button
        onClick={() => logoutMutation.mutate()}
        className="dark:hover:bg-zinc-600 hover:bg-zinc-300 w-full p-4 duration-300"
      >
        Kijelentkezés
      </button>
    </div>
  );
}
