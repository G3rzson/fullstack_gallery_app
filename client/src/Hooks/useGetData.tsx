import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export function useGetData<T>(
  url?: string,
  options?: Omit<UseQueryOptions<T, unknown>, "queryKey" | "queryFn">
) {
  return useQuery<T, unknown>({
    queryKey: [url],
    queryFn: async () => {
      if (!url) throw new Error("URL is undefined");
      const res = await axios.get(url);
      return res.data;
    },
    enabled: !!url, // csak fusson, ha van URL
    ...options,
  });
}
