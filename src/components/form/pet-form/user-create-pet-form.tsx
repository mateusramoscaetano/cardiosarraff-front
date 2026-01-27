"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { creatPetFormSchema, useCreatePet } from "@/hooks/pets/use-create-pet";
import { useClients } from "@/hooks/client/use-clients";
import { usePetsClientPage } from "@/hooks/pets/use-pet-by-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Button } from "../../_app/ui/button";
import { Icons } from "../../ui/icons";
import { DefaultField } from "../fields/default-field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cn from "@/utils/cn";
import { FieldSearchForm } from "../fields/field-search-form";

interface UserCreatePetFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isOnClientPage: boolean;
}

export type PetOwnersWithPetOwnerIdAndName = {
  id: string;
  name: string;
};

export function UserCreatePetForm({
  className,
  onClose,
  isOnClientPage,
  ...props
}: UserCreatePetFormProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<string | undefined>("");
  const [isSelected, setIsSelected] = useState(false);
  const pathName = usePathname();
  const params = pathName.split("/")[4];

  const [petOwnerWithPetOwnerIdAndName, setPetOwnerWithPetOwnerIdAndName] =
    useState<PetOwnersWithPetOwnerIdAndName[]>([]);

  const form = useForm<z.infer<typeof creatPetFormSchema>>({
    resolver: zodResolver(creatPetFormSchema),
    defaultValues: {
      name: "",
      age: "",
      race: "",
      specie: "",
      weight: "",
      pet_owner_id: "",
    },
  });

  useEffect(() => {
    if (isOnClientPage && params) {
      form.setValue("pet_owner_id", params);
    }
  }, [form, isOnClientPage, params]);

  const { data: pets, refetch } = usePetsClientPage(params);
  const { mutateAsync, isLoading, isError } = useCreatePet();
  const { data: petOwnerdata } = useClients(1, search);

  useEffect(() => {
    if (search && petOwnerdata) {
      const selectResultOfPetOwnerData = petOwnerdata.petOwners.map(
        (petOwner) => {
          return { id: petOwner.id, name: petOwner.name };
        }
      );
      setPetOwnerWithPetOwnerIdAndName(selectResultOfPetOwnerData);
    }
  }, [petOwnerdata, search]);

  const queryClient = useQueryClient();

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutateAsync(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["pets", "clients", "pets-client"],
          });
          refetch();
          toast.success("Pet registrado com sucesso", {
            theme: "light",
            style: { color: "darkslategray" },
          });
          setTimeout(() => {
            onClose();
          }, 1000);
        },
        onError: (error) => {
          console.error((error as AxiosError).response?.data);
        },
      });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  });

  return (
    <div className={cn("grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <DefaultField
            className="mb-4"
            name="name"
            label="Nome"
            placeholder="Digite o Nome do Pet"
            form={form}
            isError={isError}
            type="text"
          />
          <DefaultField
            className="mb-4 "
            name="age"
            label="Idade"
            placeholder="Digite a Idade do Pet"
            form={form}
            isError={isError}
            type="text"
          />
          <DefaultField
            className="mb-4"
            name="race"
            label="Raça"
            placeholder="Digite a Raça do Pet"
            form={form}
            isError={isError}
            type="text"
          />
          <DefaultField
            className="mb-4"
            name="weight"
            label="Peso"
            placeholder="Digite o Peso do Pet"
            form={form}
            isError={isError}
            type="text"
          />

          <div className="mb-8">
            <FormField
              control={form.control}
              name="specie"
              render={({ field, fieldState }) => (
                <>
                  <FormItem>
                    <FormLabel className="p-2">Gato ou Cachorro</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[230px]  ">
                          <SelectValue placeholder="Selecione uma espécie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Selecione</SelectLabel>
                            <SelectItem value="Gato">Gato</SelectItem>
                            <SelectItem value="Cachorro">Cachorro</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                </>
              )}
            />
          </div>

          {!isOnClientPage && (
            <>
              <FieldSearchForm
                filteredArgsWithIdAndName={petOwnerWithPetOwnerIdAndName}
                setFilteredArgsWithIdAndName={setPetOwnerWithPetOwnerIdAndName}
                form={form}
                formLabel="Pesquisar Clientes"
                name="pet_owner_id"
                inputPlaceholder="Digite o Nome do Cliente"
                resultsLabel="Clientes Encontrados"
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                search={search}
                searchValue={searchValue}
                setSearch={setSearch}
                setSearchValue={setSearchValue}
                isError={isError}
              />
            </>
          )}

          <div className="mt-4 flex items-center justify-end">
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
  );
}
