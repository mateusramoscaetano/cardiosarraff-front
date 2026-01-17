import { ResponseTableReportData } from "@/@types/ireport-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useReports(page: number, searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["reports", page, searchTerm],
    queryFn: async () => {
      const response = await fetchDataReports(page, searchTerm);

      return response;
    },
    keepPreviousData: true,
  });
}

interface ReportFilters {
  doctor?: string;
  petOwner?: string;
  pet?: string;
  clinic?: string;
}

export async function fetchDataReports(
  page: number,
  searchTerm: string | undefined,
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
  if (filters?.clinic) {
    params.append("clinic", filters.clinic);
  }

  const response = await api.get(`/reports/list-all?${params.toString()}`);

  return response.data;
}
