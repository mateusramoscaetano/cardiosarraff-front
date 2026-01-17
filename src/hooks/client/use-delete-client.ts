import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export function useDeleteClient(id: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteClient(id);
      return response;
    },
  });
}

export async function deleteClient(id: string) {
  const response: AxiosResponse<{ message: "successfully deleted" }> =
    await api.delete(`/pet-owner/${id}`);

  if (response.data) return response.data;
}
