import { useMutation } from "react-query";
import { AuthUser } from "@/@types/auth";
import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

export const userNameSchema = z
  .string({ required_error: "Campo obrigatório" })
  .min(3, "Usuário deve conter no mínimo 3 caracteres")
  .max(30, "Usuário deve conter no máximo 30 caracteres")
  .regex(
    /^[\p{L}\p{N}_.]+$/u,
    "Usuário pode conter apenas letras, números, underline e ponto"
  );

export const createClientFormSchema = z.object({
  userName: userNameSchema,
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .max(50),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .max(50),
  phone: z
    .union([
      z.literal(""),
      z
        .string()
        .min(5, "Telefone deve conter no mínimo 5 caracteres")
        .max(50),
    ])
    .optional()
    .default(""),
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
