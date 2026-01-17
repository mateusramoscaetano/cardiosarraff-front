import { Client, ResponseTableClientData } from "@/@types/tclient-table-data";
import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useClients(page: number, searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["clients", page, searchTerm],
    queryFn: async () => {
      const response = await fetchPage(page, searchTerm);

      return response;
    },
    keepPreviousData: true,
  });
}

export const fetchPage = async (
  page: number,
  searchTerm?: string
): Promise<ResponseTableClientData> => {
  const result = await api.get(
    `/pet-owner/list?page=${page}&searchTerm=${searchTerm ? searchTerm : ""}`
  );
  return result.data;
};
