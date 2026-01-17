import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { FormTitle } from "../form-title";
import { Input } from "@/components/ui/input";

export function ImagingDiagnosisHeading({ form }: { form: any }) {
  return (
    <>
      <div className="bg-pink-card">
        <FormTitle title="Solicitação de Diagnóstico por Imagem" />
      </div>

      <FormField
        control={form.control}
        name="imagingDiagnosis.suspeitaClinica"
        render={({ field }) => (
          <FormItem className="flex items-center w-full min-w-[746px]">
            <FormLabel className="text-primary ">Suspeita Clínica:</FormLabel>
            <FormControl className="flex-grow">
              <Input
                icon={false}
                {...field}
                value={(field.value as string) || ""}
                buttonSize="sm"
                className="min-w-[calc(746px-105px)]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imagingDiagnosis.previousSurgeryProcedures"
        render={({ field }) => (
          <FormItem className="flex items-center w-full min-w-[746px]">
            <FormLabel className="text-primary ">
              Procedimentos Cirúrgicos Anteriores:
            </FormLabel>
            <FormControl className="flex-grow">
              <Input
                icon={false}
                {...field}
                value={(field.value as string) || ""}
                buttonSize="sm"
                className="min-w-[calc(746px-228px)]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imagingDiagnosis.observations"
        render={({ field }) => (
          <FormItem className="flex items-center w-full min-w-[746px]">
            <FormLabel className="text-primary ">Observações:</FormLabel>
            <FormControl className="flex-grow">
              <Input
                icon={false}
                {...field}
                value={(field.value as string) || ""}
                buttonSize="sm"
                className="min-w-[calc(746px-87px)]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
