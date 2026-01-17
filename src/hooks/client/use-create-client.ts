import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthUser, TLogin } from "@/@types/auth";
import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";
import { headers } from "next/headers";

export const createClientFormSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Email inválido" })
    .max(50),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .max(50),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .max(50),
  phone: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Telefone deve conter no mínimo 5 caracteres")
    .max(50),
});

export function useCreateClient(token: string | undefined) {
  return useMutation({
    mutationFn: async (creds: z.infer<typeof createClientFormSchema>) => {
      const response = await createClient(creds, token);
      return response;
    },
  });
}

async function createClient(
  creds: z.infer<typeof createClientFormSchema>,
  token: string | undefined
) {
  const response: AxiosResponse<AuthUser> = await api.post(
    "/pet-owner/create",
    creds,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data && response.data.token) return response.data;
}
