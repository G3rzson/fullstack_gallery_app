import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import type { UserObjType } from "../Types/types";
import { refreshApi } from "../Axios/api";
import type { BackendResponseType, WithAuthDataType } from "../Types/types";

export type ContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  userObj: UserObjType | null;
  setUserObj: React.Dispatch<React.SetStateAction<UserObjType | null>>;
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userObj, setUserObj] = useState<UserObjType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsAuthLoading(true);

    const restoreToken = async () => {
      try {
        const response = await refreshApi.post<
          BackendResponseType<WithAuthDataType>
        >("/api/auth/refresh");

        const refreshed = response.data.data;

        if (!isMounted) return;

        setAccessToken(refreshed?.accessToken ?? null);
        setUserObj(refreshed?.userObj ?? null);
      } catch {
        if (!isMounted) return;

        setAccessToken(null);
        setUserObj(null);
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
        accessToken,
        setAccessToken,
        userObj,
        setUserObj,
        isAuthLoading,
        setIsAuthLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
