import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../setup/apiClient";

export default function useGaleryTitlePublicGet() {
  return useQuery({
    queryKey: ["galeryTitlePublic"],
    queryFn: async () => {
      const response = await apiClient.get("/galery/title/public/get");
      return response.data;
    },
  });
}
