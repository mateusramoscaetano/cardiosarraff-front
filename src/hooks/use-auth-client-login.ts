import { useMutation, useQueryClient } from "react-query";
import { AuthUser } from "@/@types/auth";
import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

export const clientLoginFormSchema = z.object({
  identifier: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Informe seu usuário ou email")
    .max(50),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .max(50),
});

export type ClientLoginPayload = {
  email?: string;
  userName?: string;
  password: string;
};

export function buildClientLoginPayload(
  values: z.infer<typeof clientLoginFormSchema>
): ClientLoginPayload {
  const identifier = values.identifier.trim().toLowerCase();

  if (identifier.includes("@")) {
    return { email: identifier, password: values.password };
  }

  return { userName: identifier, password: values.password };
}

export function useAuthClientLogin(addUser: (user: AuthUser) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creds: z.infer<typeof clientLoginFormSchema>) => {
      const response = await loginClient(buildClientLoginPayload(creds));
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

async function loginClient(creds: ClientLoginPayload) {
  const response: AxiosResponse<AuthUser> = await api.post(
    "/auth/login",
    creds
  );

  return response.data;
}
