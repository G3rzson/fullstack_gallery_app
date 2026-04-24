import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export function useUserLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post("/user/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
