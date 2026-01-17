import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import cn from "@/utils/cn";

interface IDefaultFieldProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  name: Path<T>;
  label: string;
  placeholder: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  type?: string;
  isError: boolean;
}

export function DefaultField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  onInput,
  className,
  type,
  isError,
}: IDefaultFieldProps<T>) {
  return (
    <div className={className}>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <FormItem>
              <FormLabel className="p-2">{label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className={cn(
                    fieldState.error ? "border-2 border-red-500" : ""
                  )}
                  icon={false}
                  onInput={onInput}
                  type={type}
                />
              </FormControl>
              <FormMessage>
                {isError ? fieldState.error?.message : ""}
              </FormMessage>
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
