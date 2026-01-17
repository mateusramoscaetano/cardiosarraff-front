"use client";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "../form/use-auth-form";
import { UserAuthClientForm } from "../form/user-auth-client-form";
import { useEffect } from "react";
import useCookie from "@/hooks/use-cookies";
import { useUser } from "@/hooks/use-user";
import { QueryClient } from "react-query";

interface ILoginExamPortalProps {}

export function LoginExamPortal({}: ILoginExamPortalProps) {
  const router = useRouter();

  const { removeUser, user } = useUser();

  useEffect(() => {
    const logout = () => {
      router.push("/exam-portal");

      removeUser();
    };

    const redirectOnMount = () => {
      if (!user) return;
      router.push("/exam-portal");
      return;
    };

    redirectOnMount();

    logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="lg:p-8 mt-8 sm:mt-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 max-w-[350px] bg-zinc-100 dark:bg-zinc-800 border-2 dark:border-zinc-500 rounded-md p-4 h-auto">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Seja Bem Vindo!
            </h1>
            <h2 className="tracking-tight font-medium text-accent text-balance drop-shadow-sm">
              Acesse o Portal de Exames utilizando o login e senha fornecidos
              pelo seu Médico Veterinário
            </h2>
          </div>
          <UserAuthClientForm />
        </div>
      </div>
    </>
  );
}
