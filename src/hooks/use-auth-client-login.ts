import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "./use-auth";
import { AuthUser, TLogin } from "@/@types/auth";
import { AxiosResponse, type AxiosError } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Email inválido" })
    .max(50),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .max(50),
});

export function useAuthClientLogin(addUser: (user: AuthUser) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: z.infer<typeof loginFormSchema>) => {
      const response = await loginClient(creds);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.token) {
        addUser(data);
      }
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}

async function loginClient(creds: z.infer<typeof loginFormSchema>) {
  const response: AxiosResponse<AuthUser> = await api.post(
    "/auth/login",
    creds
  );

  return response.data;
}
