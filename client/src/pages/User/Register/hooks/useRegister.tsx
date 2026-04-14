import { useMutation } from "@tanstack/react-query";
import type { RegisterSchemaType } from "../Validation/registerSchema";
import axios from "axios";

export default function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const response = await axios.post("/api/user/register", data);
      return response.data;
    },
  });
}
