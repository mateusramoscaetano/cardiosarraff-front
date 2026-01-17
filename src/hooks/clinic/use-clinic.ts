import { Clinic } from "@/@types/tclinic-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export function useClinic(id?: string) {
  return useQuery({
    queryKey: ["clinic", id],
    queryFn: async () => {
      const response = await fetchDataClinic(id);

      return response;
    },
  });
}

export async function fetchDataClinic(id?: string) {
  const response: AxiosResponse<Clinic> = await api.get(`/clinic/${id}/detail`);

  if (response.data) return response.data;
}
