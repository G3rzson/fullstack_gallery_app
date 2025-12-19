import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType } from "../Types/types";

export function useAuthLogout() {
  const queryClient = useQueryClient();
  return useMutation<BackendResponseType>({
    mutationFn: async () => {
      const response = await api.post<BackendResponseType>("/api/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
