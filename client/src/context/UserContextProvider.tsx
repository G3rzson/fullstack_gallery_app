import { useState, useEffect } from "react";
import type { UserObjType } from "../types/types";
import { UserContext } from "./UserContext";
import { setAuthToken, apiClient } from "../setup/apiClient";

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

  // Initialize axios interceptor with access token
  useEffect(() => {
    setAuthToken(accessToken, setAccessToken);
  }, [accessToken]);

  // Try to refresh token on app mount
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await apiClient.post("/user/refresh");
        if (response.data.success) {
          setAccessToken(response.data.data.accessToken);
          setUserObj(response.data.data.userObj);
        }
      } catch (error) {
        // Silently fail - user is not logged in
        console.log("No valid refresh token");
      } finally {
        setIsAuthLoading(false);
      }
    };

    refreshToken();
  }, []);

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
