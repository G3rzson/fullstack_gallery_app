import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export function useUserLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_BASE_URL}/user/logout`, null, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
