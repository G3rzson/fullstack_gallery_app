import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import type { GaleryTitleType } from "../Types/types";
import { refreshApi } from "../Axios/api";

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
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const { data } = await refreshApi.post("/api/auth/refresh");

        if (!isMounted) return;

        setAccessToken(data.accessToken ?? null);
        setUser(data.user ?? null);
      } catch {
        if (!isMounted) return;

        setAccessToken(null);
        setUser(null);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
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
