import { ResponseTableDoctorData } from "@/@types/tdoctor-table-data";
import { ResponseListPets } from "@/@types/tpet-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function usePets(page: number, searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["pets", page, searchTerm],
    queryFn: async () => {
      const response = await fetchDataPets(page, searchTerm);

      return response;
    },
  });
}

export async function fetchDataPets(
  page: number,
  searchTerm: string | undefined
): Promise<ResponseListPets> {
  const response = await api.get(
    `/pet/list-all?page=${page}&searchTerm=${searchTerm ? searchTerm : ""}`
  );

  return response.data;
}
