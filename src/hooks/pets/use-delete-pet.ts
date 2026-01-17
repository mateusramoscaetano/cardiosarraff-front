import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export function useDeletePet(id: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deletePet(id);
      return response;
    },
  });
}

export async function deletePet(id: string) {
  const response: AxiosResponse<{ message: "successfully deleted" }> =
    await api.delete(`/pet/${id}`);

  if (response.data) return response.data;
}
