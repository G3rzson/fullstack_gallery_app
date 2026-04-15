import { useState } from "react";
import type { UserObjType } from "../types/types";
import { UserContext } from "./UserContext";

export type UserContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  userObj: UserObjType | null;
  setUserObj: React.Dispatch<React.SetStateAction<UserObjType | null>>;
  isAuthLoading: boolean;
  setIsAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userObj, setUserObj] = useState<UserObjType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  return (
    <UserContext.Provider
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
    </UserContext.Provider>
  );
}
