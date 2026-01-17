"use client";
import { TErrorAlreadyRegistered } from "@/@types/terror-email-already-registered";
import { useClinic } from "@/hooks/clinic/use-clinic";
import {
  updateClinicFormSchema,
  useUpdateClinic,
} from "@/hooks/clinic/use-update-clinics";
import formatPhone from "@/utils/formatPhone";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { DefaultField } from "../fields/default-field";

import { Form } from "../form";

import cn from "@/utils/cn";
import { Icons } from "../../ui/icons";
import { useEffect, useState } from "react";
import { useClinics } from "@/hooks/clinic/use-clinics";
import { Button } from "../../ui/button";
import { Clinic } from "@/@types/tclinic-table-data";
import { DialogDeleteClinic } from "@/components/dialogs/clinic/dialog-delete-clinic";

interface IUserUpdateClinicFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  id: string;
}

export function UserUpdateClinicForm({
  className,
  onClose,
  id,
  ...props
}: IUserUpdateClinicFormProps) {
  const { data: clinic } = useClinic(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateClinicFormSchema>>({
    resolver: zodResolver(updateClinicFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (clinic) {
      form.reset({
        email: clinic.email,
        password: clinic.password,
        name: clinic.name,
        phone: clinic.phone,
        address: clinic.address,
      });
    }
  }, [clinic, form]);

  const { mutateAsync, isLoading, isError } = useUpdateClinic(id);
  const queryClient = useQueryClient();
  const { refetch } = useClinics(1, "");

  async function onSubmit(values: z.infer<typeof updateClinicFormSchema>) {
    const updatedFields = Object.keys(values).reduce<
      Partial<z.infer<typeof updateClinicFormSchema>>
    >((acc, key) => {
      if (
        values[key as keyof z.infer<typeof updateClinicFormSchema>] !==
        clinic?.[key as keyof Clinic]
      ) {
        acc[key as keyof z.infer<typeof updateClinicFormSchema>] =
          values[key as keyof z.infer<typeof updateClinicFormSchema>];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      toast.info("Nenhuma alteração foi feita.");
      onClose();
      return;
    }
    if (updatedFields.phone) {
      updatedFields.phone = updatedFields.phone.replace(/[^\d]/g, "");
    }

    mutateAsync(updatedFields, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["clinics"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Clinica Atualizada com Sucesso", {
            theme: "light",
            style: { color: "darkslategray" },
          });
        }, 1000);
      },
      onError: (error) => {
        const errorMessage = (
          (error as AxiosError).response?.data as TErrorAlreadyRegistered
        ).message;

        if (errorMessage === "email already registered") {
          form.setError("email", {
            type: "server",
            message: "Este email já está registrado",
          });
        }
      },
    });
  }

  function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPhone(value);
  }

  return (
    <>
      <div className={cn("grid", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DefaultField
              name="name"
              className="mb-4"
              form={form}
              label="Nome"
              placeholder="Digite o Nome da Clinica"
              type="text"
              isError={isError}
            />

            <DefaultField
              name="email"
              className="mb-4"
              form={form}
              label="Email"
              placeholder="Digite o Email da Clinica"
              type="text"
              isError={isError}
            />

            <DefaultField
              name="password"
              className="mb-4"
              form={form}
              label="Senha"
              placeholder="Digite a Senha da Clinica"
              type="text"
              isError={isError}
            />

            <DefaultField
              name="phone"
              className="mb-4"
              form={form}
              label="Telefone"
              placeholder="Digite o Telefone da Clinica"
              type="text"
              isError={isError}
              onInput={handlePhoneInput}
            />
            <DefaultField
              name="address"
              className="mb-8"
              form={form}
              label="Endereço"
              placeholder="Digite o Endereço da Clinica"
              type="text"
              isError={isError}
            />

            <div className="mt-4 flex items-center justify-center space-x-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Atualizar
              </Button>
              <DialogDeleteClinic onClose={() => setIsOpen(false)} id={id} />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
