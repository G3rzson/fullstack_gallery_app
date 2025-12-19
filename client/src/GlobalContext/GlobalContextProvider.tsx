import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import type { GaleryTitleType } from "../Types/types";
import { refreshApi } from "../Axios/api";
import type { BackendResponseType, WithAuthDataType } from "../Types/types";

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

    const restoreToken = async () => {
      try {
        const response = await refreshApi.post<
          BackendResponseType<WithAuthDataType>
        >("/api/auth/refresh");

        const refreshed = response.data.data;

        if (!isMounted) return;

        setAccessToken(refreshed?.accessToken ?? null);
        setUser(refreshed?.username ?? null);
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

    restoreToken();

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
