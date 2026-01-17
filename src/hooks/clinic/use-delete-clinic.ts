import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

export function useDeleteClinic(id: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteClinic(id);
      return response;
    },
  });
}

export async function deleteClinic(id: string) {
  const response: AxiosResponse<{ message: "successfully deleted" }> =
    await api.delete(`/clinic/${id}`);

  if (response.data) return response.data;
}
