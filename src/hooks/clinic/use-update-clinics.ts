import { Clinic } from "@/@types/tclinic-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";

export const updateClinicFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).max(50).optional(),
  password: z
    .string()
    .min(5, "Senha deve conter no mínimo 5 caracteres")
    .optional(),
  name: z
    .string()
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .max(50)
    .optional(),
  address: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .max(50)
    .optional(),
  phone: z
    .string()
    .min(5, "Telefone deve conter no mínimo 5 caracteres")
    .max(50)
    .optional(),
});

export function useUpdateClinic(id: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updateClinicFormSchema>) => {
      const response = await updateClinic(data, id);
      return response;
    },
  });
}

async function updateClinic(
  data: z.infer<typeof updateClinicFormSchema>,
  id: string
) {
  const response: AxiosResponse<Clinic> = await api.put(`/clinic/${id}`, data);

  if (response.data) return response.data;
}
