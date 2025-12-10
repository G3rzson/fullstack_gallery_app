import axios from "axios";
import CustomCenteredContainer from "./CustomCenteredContainer";

export default function FetchResultError({ error }: { error: Error | null }) {
  const errorMsg = axios.isAxiosError(error)
    ? error.response?.data?.message || "Ismeretlen hiba történt!"
    : "Ismeretlen hiba történt!";
  return <CustomCenteredContainer>{errorMsg}</CustomCenteredContainer>;
}
