import { Client } from "@/@types/client";
import { Clinic } from "@/@types/tclinic-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export function useClient(id: string | undefined) {
  return useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const response = await fetchDataClient(id);

      return response;
    },
  });
}

export async function fetchDataClient(id?: string) {
  const response: AxiosResponse<Client> = await api.get(`/pet-owner/${id}`);

  if (response.data) return response.data;
}
