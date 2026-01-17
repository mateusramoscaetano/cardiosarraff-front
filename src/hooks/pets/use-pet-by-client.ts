import { ResponseTableDoctorData } from "@/@types/tdoctor-table-data";
import {
  ResponseListPets,
  ResponsePetsListOnPetOwnerPage,
} from "@/@types/tpet-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function usePetsClientPage(id?: string) {
  return useQuery({
    queryKey: ["pets-client", id],
    queryFn: async () => {
      const response = await fetchDataPetsClientPage(id);

      return response;
    },
    keepPreviousData: true,
  });
}

export async function fetchDataPetsClientPage(
  id?: string
): Promise<ResponsePetsListOnPetOwnerPage> {
  const response = await api.get(`/pet/list/${id}`);

  return response.data;
}
