import { ResponseTableDoctorData } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useDoctors(page: number, searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["doctors", page, searchTerm],
    queryFn: async () => {
      const response = await fetchDataDoctors(page, searchTerm);

      return response;
    },
    keepPreviousData: true,
  });
}

export async function fetchDataDoctors(
  page: number,
  searchTerm: string | undefined
): Promise<ResponseTableDoctorData> {
  const response = await api.get(
    `/doctor/list?page=${page}&name=${searchTerm ? searchTerm : ""}`
  );

  return response.data;
}
