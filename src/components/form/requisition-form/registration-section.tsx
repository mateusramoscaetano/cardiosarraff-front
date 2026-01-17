import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RequisitionFormData } from "./types";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormTitle } from "./form-title";
import { DatePickerDemo } from "@/components/ui/date-picker";

interface RegistrationSectionProps {
  form: UseFormReturn<RequisitionFormData>;
}

export function RegistrationSection({ form }: RegistrationSectionProps) {
  return (
    <div className="">
      <FormTitle title="Dados Cadastrais" />

      <div className="grid grid-cols-1 gap-1">
        <div className=" flex">
          <FormField
            control={form.control}
            name="clinicName"
            render={({ field }) => (
              <FormItem className=" flex items-center col-span-2 min-w-[250.95px]">
                <FormLabel className="text-xs text-primary">Clínica:</FormLabel>
                <FormControl>
                  <Input icon={false} {...field} buttonSize="sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem className="flex items-center col-span-1">
                <FormLabel className="text-primary">Nome do Animal:</FormLabel>
                <FormControl>
                  <Input icon={false} {...field} buttonSize="sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex items-center w-[173px]">
                <FormLabel className="text-primary">Idade:</FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex">
          <FormField
            control={form.control}
            name="specie"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center">
                <FormLabel className="text-primary">Espécie:</FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-primary">Raça:</FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-primary mr-4">Sexo:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    className="flex items-center"
                  >
                    <FormItem className="flex items-center justify-center">
                      <FormControl>
                        <RadioGroupItem value="Macho" />
                      </FormControl>
                      <FormLabel className="font-normal">Macho</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center justify-center">
                      <FormControl>
                        <RadioGroupItem value="Fêmea" />
                      </FormControl>
                      <FormLabel className="font-normal">Fêmea</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Owner Information */}
      <div className="flex flex-col gap-1">
        <FormField
          control={form.control}
          name="petOwner"
          render={({ field }) => (
            <FormItem className="flex items-center w-full min-w-[746px]">
              <FormLabel className="text-primary ">
                Nome do Proprietário:
              </FormLabel>
              <FormControl className="flex-grow">
                <Input
                  icon={false}
                  {...field}
                  value={(field.value as string) || ""}
                  buttonSize="sm"
                  className="min-w-[calc(746px-132px)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex  gap-1">
          <FormField
            control={form.control}
            name="doctorName"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-primary ">
                  Nome do Veterinário:
                </FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                    className="min-w-[calc(487px-128px)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doctorCrmv"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-primary">CRMV:</FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                    className="min-w-[215px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center w-full min-w-[746px]">
              <FormLabel className="text-primary ">Email:</FormLabel>
              <FormControl className="flex-grow">
                <Input
                  icon={false}
                  {...field}
                  value={(field.value as string) || ""}
                  buttonSize="sm"
                  className="min-w-[calc(746px-132px)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex items-start gap-1 relative">
          <FormField
            control={form.control}
            name="collectDate"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="text-primary">Data:</FormLabel>
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
            name="collectTime"
            render={({ field }) => (
              <FormItem className="flex  items-center">
                <FormLabel className="text-primary">Hora de Coleta:</FormLabel>
                <FormControl>
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                    className="max-w-[85px]"
                    type="time"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem className="flex  gap-2">
                <FormLabel className="text-primary mt-1">
                  Material enviado:
                </FormLabel>
                <div className="mb-2 grid grid-cols-3 gap-1 mt-1">
                  {["Sangue", "Urina", "Fezes", "Lamina", "swab", "Outros"].map(
                    (item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="material"
                        render={() => {
                          return (
                            <FormItem
                              key={item}
                              className="flex items-center gap-1 mb-1"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem className="flex items-center   absolute bottom-3.5">
                <FormLabel className="text-primary ">Observações:</FormLabel>
                <FormControl className="flex-grow">
                  <Input
                    icon={false}
                    {...field}
                    value={(field.value as string) || ""}
                    buttonSize="sm"
                    className="min-w-[420px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
