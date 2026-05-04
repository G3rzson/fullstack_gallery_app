import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../setup/apiClient";
import type { BaseResponseType } from "../types/types";

export function useDeleteAccount(userId: string) {
  return useMutation<BaseResponseType, unknown, void>({
    mutationFn: async () => {
      const response = await apiClient.post(`/user/delete-account/${userId}`);
      return response.data;
    },
  });
}
