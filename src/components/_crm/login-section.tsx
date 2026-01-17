"use client";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "../form/use-auth-form";
import { Users, Stethoscope, UserCheck } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

interface ILoginSectionProps {}

export function LoginSection({}: ILoginSectionProps) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.user) return;
    const role = user.user.user.role;
    router.push("/exam-portal");
    return;
  }, [user.user, router]);

  return (
    <>
      <div className="lg:p-8 ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 bg-zinc-100 dark:bg-zinc-800 border-2 dark:border-zinc-500 rounded-md p-4 h-auto">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <UserCheck className="h-5 w-5 text-accent" />
              <h1 className="text-2xl font-semibold tracking-tight text-[#1e1e1e] dark:text-gray-100">
                Acesso Colaborador
              </h1>
            </div>
            <h2 className="tracking-tight font-medium text-accent">
              Seja Bem-Vindo! Faça seu login abaixo!
            </h2>
          </div>
          <UserAuthForm />

          <div className="border-t pt-3 flex flex-col gap-2">
            <p className="text-sm text-center text-gray-500">Outro acesso:</p>
            <div
              className="flex items-center justify-center gap-2 text-sm font-medium text-accent cursor-pointer hover:underline"
              onClick={() => router.push("/exam-portal")}
            >
              <Users className="h-4 w-4" />
              <span>Acesso para Pacientes e Clínicas</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
