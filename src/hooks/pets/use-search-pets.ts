import { api } from "@/lib/axios";
import { useQuery } from "react-query";

export function useSearchPets(searchTerm: string | undefined) {
  return useQuery({
    queryKey: ["pets", searchTerm],
    queryFn: async () => {
      const response = await fetchPetsSearch(searchTerm);

      return response;
    },
  });
}

export async function fetchPetsSearch(
  searchTerm: string | undefined
): Promise<{ id: string; name: string }[]> {
  const response = await api.get(
    `/pet/search?searchTerm=${searchTerm ? searchTerm : ""}`
  );

  return response.data;
}
