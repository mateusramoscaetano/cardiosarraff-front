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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();
  const { addUser } = useUser();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isLoading } = useAuthLogin(addUser);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      values.email = values.email.toLowerCase();
      const data = await mutateAsync(values);
      const role = data?.user?.role;
      const id = data?.user?.id;
      if (role === "petOwner" || role === "client") {
        if (id) router.replace(`/exam-portal/${id}`);
        return;
      }
      if (role === "clinic" || role === "doctor" || role === "adm") {
        router.replace("/crm/dashboard");
        return;
      }
      router.replace("/crm/dashboard");
    } catch (error) {
      console.error((error as AxiosError).response?.data);
      if ((error as AxiosError).response?.data) {
        setErrorMessage("Credenciais inválidas.");
      }
    }
  }

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
          <div className="mb-8">
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
                    <FormMessage>{errorMessage}</FormMessage>
                  </FormItem>
                </>
              )}
            />
          </div>
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
