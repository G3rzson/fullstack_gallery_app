import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGaleryImagePublicGet(id: string) {
  return useQuery({
    queryKey: ["galeryImage", id],
    queryFn: async () => {
      const response = await apiClient.get(`/galery/image/public/get/${id}`);
      return response.data;
    },
  });
}
