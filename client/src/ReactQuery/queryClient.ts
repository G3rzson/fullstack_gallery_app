import { QueryClient } from "@tanstack/react-query";
import { isAxios401Error } from "../Utils/isAxios401Error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (isAxios401Error(error)) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
