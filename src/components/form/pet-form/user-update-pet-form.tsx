"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cn from "@/utils/cn";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";

import { creatPetFormSchema, useCreatePet } from "@/hooks/pets/use-create-pet";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from "@/hooks/client/use-clients";
import { DefaultField } from "../fields/default-field";
import { FieldSearchForm } from "../fields/field-search-form";

import { usePetsClientPage } from "@/hooks/pets/use-pet-by-client";
import { usePetDetail } from "@/hooks/pets/use-pet-detail";
import { updatePetFormSchema, useUpdatePet } from "@/hooks/pets/use-update-pet";
import { PetDetail } from "@/components/tables/pet-detail-table";

interface UserUpdatePetFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  id: string;
}

export type PetOwnersWithPetOwnerIdAndName = {
  id: string;
  name: string;
};

export function UserUpdatePetForm({
  className,
  onClose,
  id,
  ...props
}: UserUpdatePetFormProps) {
  const pathName = usePathname();
  const clientId = pathName.split("/")[4];

  const form = useForm<z.infer<typeof updatePetFormSchema>>({
    resolver: zodResolver(updatePetFormSchema),
    defaultValues: {
      name: "",
      age: "",
      race: "",
      specie: "",
      weight: "",
      pet_owner_id: "",
    },
  });

  const { data: pet, refetch } = usePetDetail(id);

  useEffect(() => {
    if (pet) {
      form.reset({
        name: pet.name,
        age: pet.age,
        specie: pet.specie,
        race: pet.race,
        weight: pet.weight,
        pet_owner_id: pet.pet_owner_id || clientId,
      });
    }
  }, [pet, form, clientId]);

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError } = useUpdatePet(id);

  async function onSubmit(values: z.infer<typeof updatePetFormSchema>) {
    const updatedFields = Object.keys(values).reduce<
      Partial<z.infer<typeof updatePetFormSchema>>
    >((acc, key) => {
      if (
        values[key as keyof z.infer<typeof updatePetFormSchema>] !==
        pet?.[key as keyof PetDetail]
      ) {
        acc[key as keyof z.infer<typeof updatePetFormSchema>] =
          values[key as keyof z.infer<typeof updatePetFormSchema>];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      toast.info("Nenhuma alteração foi feita.");
      onClose();
      return;
    }

    mutateAsync(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["pets", "clients", "pets-client"],
        });
        setTimeout(() => {
          refetch();
          onClose();
          toast.success("Pet registrado com sucesso", {
            theme: "light",
            style: { color: "darkslategray" },
          });
        }, 1000);
      },
      onError: (error) => {
        console.error((error as AxiosError).response?.data);
      },
    });
  }

  return (
    <div className={cn("grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        defaultValue={pet?.specie}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[230px]  ">
                          <SelectValue
                            placeholder="Selecione uma opção"
                            className="text-black dark:text-gray-100"
                          />
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
                    <FormMessage>{isError}</FormMessage>
                  </FormItem>
                </>
              )}
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Button
              disabled={isLoading}
              type="button"
              onClick={() => {
                onSubmit(form.getValues());
              }}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Atualizar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
