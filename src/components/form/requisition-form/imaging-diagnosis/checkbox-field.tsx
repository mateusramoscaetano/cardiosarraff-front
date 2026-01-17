import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/form/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "../types";
import cn from "@/utils/cn";

interface CheckboxFieldProps {
  form: UseFormReturn<RequisitionFormData>;
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  checkSize?: "sm" | "md" | "lg";
}

export function CheckboxField({
  form,
  name,
  label,
  className = "flex items-center space-x-1",
  labelClassName = "text-xs",
  checkSize = "sm",
}: CheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="size-3"
              checkSize={checkSize}
            />
          </FormControl>
          <FormLabel
            className={cn(
              "text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
          >
            {label}
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
