import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/form/form";

import { Checkbox } from "@/components/ui/checkbox";

export function Cardiology({ form }: { form: any }) {
  return (
    <div className="w-full flex items-center justify-between text-primary py-2 px-4">
      <div className="w-full">
        <h3 className="text-sm font-bold mb-3">Cardiologia</h3>
        <div className="flex  gap-4">
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.echocardiogramEchodopplercardiogram"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium">
                  Ecocardiograma / <br />
                  Ecodopplercardiograma
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.electrocardiogram"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium">
                  Eletrocardiograma
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.systemicPressureMeasurement"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium">
                  Mensuração de pressão sistêmica
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.holter"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium" htmlFor="holter">
                  Holter
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.pericardiocentesis"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium">
                  Pericardiocentese
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagingDiagnosis.cardiology.monitoring"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-3"
                    checkSize="sm"
                  />
                </FormControl>
                <FormLabel className="text-[10px] font-medium">
                  Acompanhamento
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
