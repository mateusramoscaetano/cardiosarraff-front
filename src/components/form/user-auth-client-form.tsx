"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeOff, Eye } from "lucide-react";

import cn from "@/utils/cn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useAuthLogin, loginFormSchema } from "@/hooks/use-auth-login";
import { useUser } from "@/hooks/use-user";
import { AxiosError } from "axios";
import { useAuthClientLogin } from "@/hooks/use-auth-client-login";

interface UserAuthClientFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthClientForm({
  className,
  ...props
}: UserAuthClientFormProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();
  const { addUser, user } = useUser();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isLoading, error } = useAuthClientLogin(addUser);

  React.useEffect(() => {
    if (!user) return;
    const role = user.user.role;
    if (role === "clinic" || role === "doctor" || role === "adm") {
      router.push("/crm/dashboard");
      return;
    }
    if (role === "petOwner" || role === "client") {
      router.push(`/exam-portal/${user.user.id}`);
      return;
    }
  }, [user, router]);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      values.email = values.email.toLowerCase();
      const data = await mutateAsync(values);
      const role = data?.user?.role;
      const id = data?.user?.id;
      if (role === "clinic" || role === "doctor" || role === "adm") {
        router.replace("/crm/dashboard");
        return;
      }
      if (role === "petOwner" || role === "client") {
        if (id) router.replace(`/exam-portal/${id}`);
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  // Extrair mensagem de erro do AxiosError
  const getErrorMessage = () => {
    if (!error) return "";

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) {
        return "Email ou senha inválidos";
      }
    }

    return "Erro inesperado. Tente novamente.";
  };

  const errorMessage = getErrorMessage();

  return (
    <div className={cn("grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <>
                  <FormItem>
                    <FormLabel className="p-2">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        {...field}
                        className={
                          fieldState.error ? "border-2 border-red-500" : ""
                        }
                        icon={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <div className="mb-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <>
                  <FormItem>
                    <FormLabel className="p-2">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          {...field}
                          className={
                            fieldState.error ? "border-2 border-red-500" : ""
                          }
                          icon={false}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={16} color="	#8d8d8d" />
                          ) : (
                            <Eye size={16} color="	#8d8d8d" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>

          {errorMessage && (
            <div className=" text-sm text-red-600 ">{errorMessage}</div>
          )}

          <div className="mt-4 flex items-center justify-center">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Acessar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
