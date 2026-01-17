import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { FormTitle } from "./form-title";

interface LaboratorySectionProps {
  form: UseFormReturn<RequisitionFormData>;
}

export function LaboratorySection({ form }: LaboratorySectionProps) {
  return (
    <div className="">
      <FormTitle title="Para Uso do Laboratório" />
      <div className="grid grid-cols-2 gap-0.5">
        <FormField
          control={form.control}
          name="laboratoryUse.number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  icon={false}
                  {...field}
                  className="border-none "
                  buttonSize="sm"
                  placeholder="Número"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="laboratoryUse.date"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between gap-1">
              <FormControl>
                <DatePickerDemo
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(selectedDate) => {
                    field.onChange(
                      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="laboratoryUse.time"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  icon={false}
                  type="time"
                  {...field}
                  className="border-none "
                  buttonSize="sm"
                  placeholder="Horário"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex  gap-4 items-center">
          <FormField
            control={form.control}
            name="laboratoryUse.paid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2 ml-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Pago</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="laboratoryUse.invoiced"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Faturado</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
