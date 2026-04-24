import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGaleryTitleGet() {
  return useQuery({
    queryKey: ["galeryTitle"],
    queryFn: async () => {
      const response = await apiClient.get("/galery/title/get");
      return response.data;
    },
  });
}
