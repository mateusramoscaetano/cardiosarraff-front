import { ResponseTableClinicData } from "@/@types/tclinic-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useClinics(page: number, searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["clinics", page, searchTerm],
    queryFn: async () => {
      const response = await fetchDataClinics(page, searchTerm);

      return response;
    },
    keepPreviousData: true,
  });
}

export async function fetchDataClinics(
  page: number,
  searchTerm?: string
): Promise<ResponseTableClinicData> {
  const response = await api.get(
    `/clinic/list?page=${page}&name=${searchTerm ? searchTerm : ""}`
  );

  return response.data;
}
