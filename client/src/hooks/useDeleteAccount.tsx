import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponseType, unknown, void>({
    mutationFn: async () => {
      const response = await apiClient.post("/user/delete-account");
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
