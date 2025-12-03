import { useState } from "react";
import { GlobalContext } from "./Context";

export type ContextType = {
  showAuthMenu: boolean;
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  return (
    <GlobalContext.Provider value={{ showAuthMenu, setShowAuthMenu }}>
      {children}
    </GlobalContext.Provider>
  );
}
