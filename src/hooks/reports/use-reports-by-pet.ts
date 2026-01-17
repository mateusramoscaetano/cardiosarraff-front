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

export function useReportsByPet(id?: string, token?: string) {
  return useQuery({
    queryKey: ["reports-bypet", id, token],
    queryFn: async () => {
      const response = await fetchDataReportsByPet(id, token);

      return response;
    },
    keepPreviousData: true,
  });
}

export async function fetchDataReportsByPet(
  id?: string,
  token?: string
): Promise<ListReportsResponse> {
  const response = await api.get(`/report/list/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
