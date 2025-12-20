import { GlobalContext } from "../GlobalContext/Context";
import { useContext } from "react";

export function useContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
