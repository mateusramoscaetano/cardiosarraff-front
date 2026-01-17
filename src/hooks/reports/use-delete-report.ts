import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

export function useDeleteReport(id: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteReport(id);
      return response;
    },
  });
}

export async function deleteReport(id: string) {
  const response: AxiosResponse<{ message: "successfully deleted" }> =
    await api.delete(`/report/${id}`);

  if (response.data) return response.data;
}
