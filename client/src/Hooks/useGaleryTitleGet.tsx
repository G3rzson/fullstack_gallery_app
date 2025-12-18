import { useQuery } from "@tanstack/react-query";
import { api } from "../Axios/api";

export default function useGaleryTitleGet() {
  return useQuery({
    queryKey: ["galeryTitles"],
    queryFn: async () => {
      const res = await api.get("/api/galery/title/get");
      return res.data;
    },
  });
}
