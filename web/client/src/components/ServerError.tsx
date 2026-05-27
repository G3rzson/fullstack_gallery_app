import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAxiosErrorMessage } from "../functions/getAxiosErrorMessage";
import type { AxiosError } from "axios";

export default function ServerError({
  error,
}: {
  error: AxiosError | Error | unknown;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error(getAxiosErrorMessage(error));
    navigate("/");
  }, [error, navigate]);

  return null;
}
