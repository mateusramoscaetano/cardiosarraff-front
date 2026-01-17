import { Doctor, DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export function useDoctor(id?: string) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const response = await fetchDataDoctor(id);

      return response;
    },
  });
}

export async function fetchDataDoctor(id?: string) {
  const response: AxiosResponse<DoctorDetailResponse> = await api.get(
    `/doctor/${id}/detail`
  );

  if (response.data) return response.data;
}
