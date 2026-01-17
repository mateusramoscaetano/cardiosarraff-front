import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "./use-auth";
import { AuthUser, TLogin } from "@/@types/auth";
import { AxiosResponse } from "axios";
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

export function useAuthLogin(addUser: (user: AuthUser) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: z.infer<typeof loginFormSchema>) => {
      const response = await login(creds, addUser);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}

async function login(
  creds: z.infer<typeof loginFormSchema>,
  addUser: (user: AuthUser) => void
) {
  const response: AxiosResponse<AuthUser> = await api.post(
    "/auth/login",
    creds
  );

  if (response.data && response.data.token) addUser(response.data);

  return response.data;
}
