import axios, { AxiosError, AxiosResponse } from "axios";
import useCookie from "./use-cookies";
import { useUser } from "./use-user";
import { AuthUser, TLogin } from "@/@types/auth";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PageContext } from "@/contexts/type";
import { useQueryClient } from "react-query";

export const API_URL = "http://localhost:3001";

interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string;
  token: string;
  success: boolean;
}

interface AuthResponseClinic {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string;
  token: string;
  success: boolean;
  address: string;
}

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { setPage } = useContext(PageContext);

  const { getCookie } = useCookie();
  const router = useRouter();

  const queryClient = useQueryClient();

  const refresh = () => {
    let existingUser = null;
    const getFromCookie = async () => (existingUser = getCookie("user"));
    getFromCookie();

    if (existingUser) {
      try {
        addUser(JSON.parse(existingUser));
      } catch (e) {}
    }
  };

  const login = async (creds: TLogin) => {
    try {
      const response: AxiosResponse<AuthUser> = await api.post(
        "/auth/login",
        creds
      );

      if (response.data && response.data.token) addUser(response.data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return { ...error.response.data, success: false } as AuthResponse;
        }
      }

      throw error;
    }
  };

  const logout = () => {
    setPage("report");
    queryClient.clear();
    removeUser();
    router.push("/exam-portal");
  };

  return { user, login, logout, refresh };
};
