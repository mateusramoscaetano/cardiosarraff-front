import { useCookies } from "next-client-cookies";

const useCookie = () => {
  const cookies = useCookies();

  const getCookie = (key: string) => cookies.get(key) || null;

  const setCookie = (key: string, value: string) =>
    cookies.set(key, value, {
      expires: 365,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

  const removeCookie = (key: string) => cookies.remove(key);

  return { setCookie, getCookie, removeCookie };
};

export default useCookie;
