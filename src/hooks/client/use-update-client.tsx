import { useMutation } from "react-query";

import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

import { TPetOwnerUpdateResponse } from "@/@types/tpet-owner-update-response";

export const updateClientFormSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Email inválido" })
    .optional(),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .optional(),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .optional(),
  phone: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Telefone deve conter no mínimo 5 caracteres")
    .optional(),
  clinicId: z.string({ required_error: "Campo obrigatório" }).optional(),
});

export function useUpdateClient(token: string | undefined, id: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updateClientFormSchema>) => {
      const response = await updateClient(data, token, id);
      return response;
    },
  });
}

async function updateClient(
  data: z.infer<typeof updateClientFormSchema>,
  token: string | undefined,
  id: string
) {
  const response: AxiosResponse<TPetOwnerUpdateResponse> = await api.put(
    `/pet-owner/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data) return response.data;
}
