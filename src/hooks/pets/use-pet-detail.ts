import { Client } from "@/@types/client";
import { Clinic } from "@/@types/tclinic-table-data";
import { PetDetail } from "@/components/tables/pet-detail-table";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export function usePetDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["pet-detail", id],
    queryFn: async () => {
      const response = await fetchDataPetDetail(id);

      return response;
    },
  });
}

export async function fetchDataPetDetail(id?: string) {
  const response: AxiosResponse<PetDetail> = await api.get(`/pet/${id}`);

  if (response.data) return response.data;
}
