import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  queryKey: string;
  url: string;
  enabled?: boolean;
};

export default function UseGetMutation<T>({
  queryKey,
  url,
  enabled = true,
}: Props) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const res = await axios.get<T>(url);
        return res.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Ismeretlen hiba történt!";
          toast.error(message);
        }
        throw error; // fontos: dobjuk tovább, hogy useQuery is ismerje a hibát
      }
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
