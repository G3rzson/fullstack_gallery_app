import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";
import type { GaleryTitleType, UserObjType } from "../Types/types";
import { refreshApi } from "../Axios/api";
import type { BackendResponseType, WithAuthDataType } from "../Types/types";

export type ContextType = {
  editingGaleryTitleObj: GaleryTitleType | null;
  setEditingGaleryTitleObj: React.Dispatch<
    React.SetStateAction<GaleryTitleType | null>
  >;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  userObj: UserObjType | null;
  setUserObj: React.Dispatch<React.SetStateAction<UserObjType | null>>;
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editingGaleryTitleObj, setEditingGaleryTitleObj] =
    useState<GaleryTitleType | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userObj, setUserObj] = useState<UserObjType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        editingGaleryTitleObj,
        setEditingGaleryTitleObj,
        accessToken,
        setAccessToken,
        userObj,
        setUserObj,
        isAuthLoading,
        setIsAuthLoading,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
