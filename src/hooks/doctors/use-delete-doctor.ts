import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

export function useDeleteDoctor(id: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteDoctor(id);
      return response;
    },
  });
}

export async function deleteDoctor(id: string) {
  const response: AxiosResponse<{ message: "successfully deleted" }> =
    await api.delete(`/doctor/${id}`);

  if (response.data) return response.data;
}
