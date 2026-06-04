"use client";
import { useRouter } from "next/navigation";
import { UserAuthClientForm } from "../form/user-auth-client-form";
import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";

export function LoginExamPortal() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const role = user.user.role;
    const id = user.user.id;

    if (role === "petOwner" || role === "client") {
      if (id) router.replace(`/exam-portal/${id}`);
      return;
    }

    if (role === "clinic" || role === "doctor" || role === "adm") {
      router.replace("/crm/dashboard");
    }
  }, [user, router]);

  return (
    <div className="w-full max-w-[350px] mx-auto lg:p-8">
      <div className="flex w-full flex-col justify-center space-y-4 bg-zinc-100 dark:bg-zinc-800 border-2 dark:border-zinc-500 rounded-xl p-4 h-auto">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Seja Bem Vindo!
          </h1>
          <h2 className="text-sm sm:text-base tracking-tight font-medium text-accent text-balance px-2">
            Acesse o Portal de Exames utilizando o login e senha fornecidos pelo
            seu Médico Veterinário
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 px-2 lg:hidden">
            Baixe o exame do seu pet em poucos cliques.
          </p>
        </div>
        <UserAuthClientForm />
      </div>
    </div>
  );
}
