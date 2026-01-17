import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthUser, TLogin } from "@/@types/auth";
import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { z } from "zod";

export const updatePetFormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Name must be at least 1 characters long")
    .optional(),
  age: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Password must be at least 5 characters long")
    .optional(),
  race: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Race must be at least 5 characters long")
    .optional(),
  specie: z.string().optional(),
  weight: z.string().optional(),
  pet_owner_id: z.string(),
});

export function useUpdatePet(id?: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updatePetFormSchema>) => {
      const response = await updatePet(data, id);
      return response;
    },
  });
}

async function updatePet(
  data: z.infer<typeof updatePetFormSchema>,
  id?: string
) {
  const response: AxiosResponse<{
    id: string;
    name: string;
    age: string;
    race: string;
    specie: string;
    createdAt: Date;
    updatedAt: Date;
    pet_owner_id: string;
  }> = await api.put(`/pet/${id}`, data);

  if (response.data) return response.data;
}
