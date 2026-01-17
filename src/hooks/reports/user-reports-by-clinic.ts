import { ResponseTableReportData } from "@/@types/ireport-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useReportsByClinic(
  page: number,
  searchTerm: string | undefined,
  id?: string
) {
  return useQuery({
    queryKey: ["reports-clinic", page, searchTerm, id],
    queryFn: async () => {
      const response = await fetchDataReportsByClinic(page, searchTerm, id);

      return response;
    },
    keepPreviousData: true,
  });
}

interface ReportFilters {
  doctor?: string;
  petOwner?: string;
  pet?: string;
}

export async function fetchDataReportsByClinic(
  page: number,
  searchTerm: string | undefined,
  id?: string,
  filters?: ReportFilters
): Promise<ResponseTableReportData> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (searchTerm) {
    params.append("searchTerm", searchTerm);
  }

  if (filters?.doctor) {
    params.append("doctor", filters.doctor);
  }
  if (filters?.petOwner) {
    params.append("petOwner", filters.petOwner);
  }
  if (filters?.pet) {
    params.append("pet", filters.pet);
  }

  const response = await api.get(
    `/report/list-by-clinic/${id}?${params.toString()}`
  );

  return response.data;
}
