import { AuthContext } from "@/contexts/type";
import { useContext } from "react";
import useCookie from "./use-cookies";
import { AuthUser } from "@/@types/auth";
import { setApiAuthToken } from "@/lib/axios";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setCookie, removeCookie } = useCookie();

  const addUser = (user: AuthUser) => {
    setUser(user);
    setApiAuthToken(user.token);
    setCookie("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setApiAuthToken(null);
    removeCookie("user");
  };

  return { user, addUser, removeUser };
};
