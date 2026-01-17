import { api } from "@/lib/axios";
import { useMutation } from "react-query";
import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["application/pdf"];

const fileSchema =
  typeof window !== "undefined"
    ? z.instanceof(File).refine((file) => {
        return ACCEPTED_FILE_TYPES.includes(file.type);
      }, "File must be a pdf")
    : z.any();

export const createRequisitionFormSchema = z.object({
  file: fileSchema.nullish(),
});

export function useCreateRequisition(token?: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof createRequisitionFormSchema>) => {
      const response = await createRequisition(data, token);
      return response;
    },
  });
}

async function createRequisition(
  data: z.infer<typeof createRequisitionFormSchema>,
  token?: string
) {
  const formData = new FormData();

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await api.post(`/requisition/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
