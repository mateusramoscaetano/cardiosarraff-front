import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthUser, TLogin } from "@/@types/auth";
import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";
import { headers } from "next/headers";
import { Doctor } from "@/@types/tdoctor-table-data";

export const createDoctorFormSchema = z.object({
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

export function useCreateDoctor() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof createDoctorFormSchema>) => {
      const response = await createDoctor(data);
      return response;
    },
  });
}

async function createDoctor(data: z.infer<typeof createDoctorFormSchema>) {
  const response: AxiosResponse<Doctor> = await api.post(
    "/doctor/create",
    data
  );

  if (response.data) return response.data;
}
