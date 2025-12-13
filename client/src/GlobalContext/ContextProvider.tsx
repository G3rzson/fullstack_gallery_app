import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import type { GaleryTitleType } from "../Types/types";
import api from "../api/api";

export type ContextType = {
  editingGaleryTitleObj: GaleryTitleType | null;
  setEditingGaleryTitleObj: React.Dispatch<
    React.SetStateAction<GaleryTitleType | null>
  >;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editingGaleryTitleObj, setEditingGaleryTitleObj] =
    useState<GaleryTitleType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        setIsAuthLoading(true);
        const res = await api.post("/auth/refresh", {});
        if (res.data.success) {
          setAccessToken(res.data?.accessToken);
          setUser(res.data?.user);
        }
      } catch (err) {
        // remain logged out
      } finally {
        setIsAuthLoading(false);
      }
    };
    restoreSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        editingGaleryTitleObj,
        setEditingGaleryTitleObj,
        accessToken,
        setAccessToken,
        user,
        setUser,
        isAuthLoading,
        setIsAuthLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
