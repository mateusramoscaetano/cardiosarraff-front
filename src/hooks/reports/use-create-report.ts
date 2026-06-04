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

export const createReportFormSchema = z.object({
  clinicId: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Selecione uma clínica"),
  petId: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Selecione um pet"),
  file: fileSchema,
  type: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Selecione o tipo de exame"),
});

export function useCreateReport(token?: string) {
  return useMutation({
    mutationFn: async (data: z.infer<typeof createReportFormSchema>) => {
      const response = await createReport(data, token);
      return response;
    },
  });
}

async function createReport(
  data: z.infer<typeof createReportFormSchema>,
  token?: string
) {
  if (!data.petId || !data.clinicId) {
    throw new Error("Selecione a clínica e o pet antes de enviar.");
  }

  const formData = new FormData();
  formData.append("clinicId", data.clinicId);
  formData.append("petId", data.petId);
  formData.append("type", data.type);

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await api.post(
    `/report/create/${data.petId}/${data.clinicId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
