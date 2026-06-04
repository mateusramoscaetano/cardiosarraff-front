import { AuthUser } from "@/@types/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function setApiAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

function getAuthTokenFromCookie() {
  if (typeof document === "undefined") return null;

  const cookieEntry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("user="));

  if (!cookieEntry) return null;

  try {
    const rawValue = cookieEntry.slice("user=".length);
    const parsed = JSON.parse(decodeURIComponent(rawValue)) as AuthUser;
    return parsed.token || null;
  } catch {
    return null;
  }
}

api.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const token = getAuthTokenFromCookie();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
