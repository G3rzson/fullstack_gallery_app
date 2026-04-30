import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserContext } from "./useUserContext";

export default function useProtection(options: {
  type: "protected" | "admin";
}) {
  const { userObj, isAuthLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    if (options.type === "admin") {
      if (!userObj || userObj.role !== "ADMIN") {
        toast.error("Nincs jogosultságod az oldal megtekintéséhez!");
        setTimeout(() => navigate("/", { replace: true }), 0);
      }
    } else if (options.type === "protected") {
      if (!userObj) {
        toast.error("Bejelentkezés szükséges!");
        setTimeout(() => navigate("/login", { replace: true }), 0);
      }
    }
  }, [userObj, isAuthLoading, navigate, options.type]);

  return {
    isLoading:
      isAuthLoading ||
      (options.type === "admin"
        ? !userObj || userObj.role !== "ADMIN"
        : !userObj),
    userObj,
  };
}
