import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";

export const updateDoctorFormSchema = z.object({
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
  phone: z
    .string()
    .min(5, "Telefone deve conter no mínimo 5 caracteres")
    .max(50)
    .optional(),
});

export function useUpdateDoctor(id: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updateDoctorFormSchema>) => {
      const response = await updateDoctor(data, id);
      return response;
    },
  });
}

async function updateDoctor(
  data: z.infer<typeof updateDoctorFormSchema>,
  id: string
) {
  const response: AxiosResponse<DoctorDetailResponse> = await api.put(
    `/doctor/${id}`,
    data
  );

  if (response.data) return response.data;
}
