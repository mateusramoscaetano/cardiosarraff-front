"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import cn from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createReportFormSchema,
  useCreateReport,
} from "@/hooks/reports/use-create-report";
import { Input } from "../../ui/input";
import { Button } from "../../_app/ui/button";
import { Icons } from "../../ui/icons";
import { useClinics } from "@/hooks/clinic/use-clinics";
import { useState, useEffect } from "react";
import { DialogCreateClient } from "@/components/dialogs/client/dialog-create-client";
import { usePets } from "@/hooks/pets/use-pets";
import { Pet } from "@/@types/tpet-table-data";
import { toast } from "react-toastify";
import { DialogCreatePet } from "@/components/dialogs/pet/dialog-create-pet";
import { useQueryClient } from "react-query";
import { FieldSearchForm } from "../fields/field-search-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReports } from "@/hooks/reports/use-reports";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { useSearchPets } from "@/hooks/pets/use-search-pets";

export type TClinicsWithClinicIdAndName = {
  id: string;
  name: string;
};

const EXAM_TYPES = [
  "Raio X",
  "Tomografia",
  "Cardiologia",
  "Exame Laboratorial",
  "Ultrassonografia",
];

interface IUseCreateReportFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isOnPetDetailPage: boolean;
}

export function UseCreateReportForm({
  className,
  onClose,
  isOnPetDetailPage,
  ...props
}: IUseCreateReportFormProps) {
  const [searchValueClinic, setSearchValueClinic] = useState<string>("");
  const [searchValuePet, setSearchValuePet] = useState<string>("");
  const [searchClinic, setSearchClinic] = useState<string | undefined>("");
  const [searchPet, setSearchPet] = useState<string | undefined>("");
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedPet, setIsSelectedPet] = useState(false);

  const pathName = usePathname();
  const petId = pathName.split("/")[5];

  const { user } = useUser();

  const form = useForm<z.infer<typeof createReportFormSchema>>({
    resolver: zodResolver(createReportFormSchema),
    defaultValues: {
      clinicId: "",
      petId: "",
      file: null,
      type: "",
    },
  });

  useEffect(() => {
    if (isOnPetDetailPage && petId) {
      form.reset((formValues) => ({
        ...formValues,
        petId,
      }));
    }
  }, [isOnPetDetailPage, petId, form]);

  const { data: clinicsData } = useClinics(1, searchClinic);

  const { data: petsData } = useSearchPets(searchPet);
  const { mutateAsync, isLoading, isError } = useCreateReport(user?.token);
  const { refetch } = useReports(1, "");

  const [clinicsWithClinicIdAndName, setClinicsWithClinicIdAndName] = useState<
    TClinicsWithClinicIdAndName[]
  >([]);
  const [petsDataFormState, setPetsDataFormState] = useState<Pet[]>([]);

  useEffect(() => {
    if (searchClinic && clinicsData) {
      const selectResultOfClinicsData = clinicsData.clinics.map((clinic) => {
        return { id: clinic.id, name: clinic.name };
      });
      setClinicsWithClinicIdAndName(selectResultOfClinicsData);
    }
  }, [clinicsData, searchClinic]);

  useEffect(() => {
    if (searchPet && petsData) {
      setPetsDataFormState(petsData);
    }
  }, [searchPet, petsData]);

  const queryClient = useQueryClient();

  const onSubmit = (values: z.infer<typeof createReportFormSchema>) => {
    mutateAsync(values, {
      onSuccess: async () => {
        // Invalida queries de reports para forçar refetch
        queryClient.invalidateQueries({
          predicate: (query) => {
            // Invalida todas queries de reports (admin e clinic)
            return (
              query.queryKey[0] === "admin-reports" ||
              query.queryKey[0] === "clinic-reports"
            );
          },
        });

        toast.success("Laudo cadastrado com sucesso!", {
          theme: "dark",
          style: { color: "#E4722C" },
          progressStyle: { color: "#E4722C", backgroundColor: "#E4722C" },
        });

        setTimeout(() => {
          onClose();
        }, 1000);
      },
      onError: (error) => { },
    });
  };

  return (
    <>
      <div className={cn("grid", className)} {...props}>
        <div className="w-full flex items-center justify-center space-x-2 mb-4">
          {!isOnPetDetailPage && (
            <>
              <DialogCreateClient className="w-1/2" isOnForm={true} />
              <DialogCreatePet
                className="w-1/2"
                isOnForm={true}
                isOnClientPage={false}
              />
            </>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSearchForm
              form={form}
              filteredArgsWithIdAndName={clinicsWithClinicIdAndName}
              formLabel="Pesquisar Clinica"
              inputPlaceholder="Digite o nome da clínica"
              isSelected={isSelected}
              name="clinicId"
              resultsLabel={
                isSelected ? "Clinica Selecionada" : "Clinicas Encontradas"
              }
              search={searchClinic}
              searchValue={searchValueClinic}
              setFilteredArgsWithIdAndName={setClinicsWithClinicIdAndName}
              setIsSelected={setIsSelected}
              setSearch={setSearchClinic}
              setSearchValue={setSearchValueClinic}
              isError={isError}
            />
            {!isOnPetDetailPage && (
              <>
                <FieldSearchForm
                  form={form}
                  filteredArgsWithIdAndName={petsDataFormState}
                  formLabel="Pesquisar Pet"
                  inputPlaceholder="Digite o nome do pet"
                  isSelected={isSelectedPet}
                  name="petId"
                  resultsLabel={
                    isSelected ? "Pet Selecionado" : "Dono / Pet Encontrados"
                  }
                  search={searchPet}
                  searchValue={searchValuePet}
                  setFilteredArgsWithIdAndName={setPetsDataFormState}
                  setIsSelected={setIsSelectedPet}
                  setSearch={setSearchPet}
                  setSearchValue={setSearchValuePet}
                  isError={isError}
                />
              </>
            )}

            <div className="mb-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="p-2">Tipo de Exame</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full h-10 focus:outline-none focus:ring-0 border-gray-300 border-[1px]">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EXAM_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="file"
                render={({
                  field: { value, onChange, ...fieldProps },
                  fieldState,
                }) => (
                  <>
                    <FormItem>
                      <FormLabel className="p-2">Upload de Arquivo</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                          className={
                            (cn(
                              "text-zinc-600 dark:text-gray-100 text-center flex items-center justify-end mt-2"
                            ),
                              isError && form.getValues("file") === null
                                ? "border-2 border-red-500"
                                : "")
                          }
                          icon={false}
                        />
                      </FormControl>
                      <FormMessage>
                        {isError && form.getValues("file") === null
                          ? "Campo Arquivo Obrigatório"
                          : ""}
                      </FormMessage>
                    </FormItem>
                  </>
                )}
              />
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
