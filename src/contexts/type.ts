import { AuthUser } from "@/@types/auth";
import { Dispatch, SetStateAction, createContext } from "react";

interface TAuthContext {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

interface IPageContext {
  page: string | undefined;
  setPage: Dispatch<SetStateAction<string | undefined>>;
}

export const PageContext = createContext<IPageContext>({
  page: "report",
  setPage: () => {},
});
interface IClientContext {
  id: string | undefined;
  setId: Dispatch<SetStateAction<string | undefined>>;
}

export const ClientContext = createContext<IClientContext>({
  id: "",
  setId: () => {},
});
