import { useMutation } from "react-query";

import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

export const creatPetFormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Nome deve conter no mínimo 5 caracteres"),

  age: z.string({ required_error: "Campo obrigatório" }),
  race: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Raça deve conter pelo menos 1 caracter"),

  specie: z.string({ message: "Selecione a espécie" }),
  weight: z.string({ message: "Insira o peso do pet" }),
  pet_owner_id: z.string().min(1, "Race must be at least 5 characters long"),
});

export function useCreatePet() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof creatPetFormSchema>) => {
      const response = await createPet(data);
      return response;
    },
  });
}

async function createPet(data: z.infer<typeof creatPetFormSchema>) {
  const response = await api.post(`/pet/create/${data.pet_owner_id}`, data);

  if (response.data) return response.data;
}
