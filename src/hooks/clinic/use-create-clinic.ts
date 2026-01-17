import { Clinic } from "@/@types/tclinic-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";

export const createClinicFormSchema = z.object({
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
  address: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Nome deve conter no mínimo 5 caracteres")
    .max(50),
  phone: z
    .string({ required_error: "Campo obrigatório" })
    .min(5, "Telefone deve conter no mínimo 5 caracteres")
    .max(50),
});

export function useCreateClinic() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof createClinicFormSchema>) => {
      const response = await createClinic(data);
      return response;
    },
  });
}

async function createClinic(data: z.infer<typeof createClinicFormSchema>) {
  const response: AxiosResponse<Omit<Clinic, "password">> = await api.post(
    "/clinic/create",
    data
  );

  if (response.data) return response.data;
}
