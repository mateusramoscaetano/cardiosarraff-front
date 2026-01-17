"use client";
import { AuthUser } from "@/@types/auth";
import useCookie from "@/hooks/use-cookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContext } from "./type";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getCookie } = useCookie();

  useEffect(() => {
    const initializeAuth = async () => {
      if (!user) {
        const existingUser = getCookie("user");
        if (existingUser) {
          try {
            setUser(JSON.parse(existingUser));
          } catch (e) {
            console.error("Error parsing user from cookie:", e);
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [user, getCookie]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
