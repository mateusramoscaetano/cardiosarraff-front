import { api } from "@/lib/axios";
import { useQuery } from "react-query";

interface Doctor {
  name: string;
}

export interface Report {
  id: string;
  url: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  pet_id: string;
  clinicId: string | null;
  clinic: string | null;
  petOwner: string;
  phone: string;
  petId: string;
  doctor: Doctor;
}

export interface ListReportsResponse {
  reports: Report[];
}

export function useReportsByClient(id?: string) {
  return useQuery({
    queryKey: ["reports-byclient", id],
    queryFn: async () => {
      const response = await fetchDataReportsByClient(id);

      return response;
    },
    keepPreviousData: true,
  });
}

export async function fetchDataReportsByClient(
  id?: string
): Promise<ListReportsResponse> {
  const response = await api.get(`/reports/list-by-client/${id}`, {});

  return response.data;
}
