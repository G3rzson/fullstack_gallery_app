import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../Axios/api";
import type { BackendResponseType } from "../Types/types";

export function useAuthDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation<BackendResponseType>({
    mutationFn: async () => {
      const response = await api.delete<BackendResponseType>(
        "/api/auth/delete-account"
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
