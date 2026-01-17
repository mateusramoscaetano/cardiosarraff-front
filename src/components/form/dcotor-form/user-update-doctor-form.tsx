"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cn from "@/utils/cn";
import { Form } from "../form";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import { AxiosError } from "axios";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import formatPhone from "@/utils/formatPhone";
import { DefaultField } from "../fields/default-field";
import { TErrorAlreadyRegistered } from "@/@types/terror-email-already-registered";
import { useDoctors } from "@/hooks/doctors/use-doctors";
import {
  updateDoctorFormSchema,
  useUpdateDoctor,
} from "@/hooks/doctors/use-update-doctor";
import { DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { useDoctor } from "@/hooks/doctors/use-doctor";
import { DialogDeleteDoctor } from "@/components/dialogs/doctor/dialog-delete-doctor";

interface UserUpdateDoctorFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  id: string;
}

export function UserUpdateDoctorForm({
  className,
  onClose,
  id,
  ...props
}: UserUpdateDoctorFormProps) {
  const { user } = useUser();
  const { data: doctor } = useDoctor(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateDoctorFormSchema>>({
    resolver: zodResolver(updateDoctorFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (doctor) {
      form.reset({
        email: doctor.email,
        password: doctor.password,
        name: doctor.name,
        phone: doctor.phone,
      });
    }
  }, [doctor, form]);

  const { mutateAsync, isLoading, isError } = useUpdateDoctor(id);
  const { refetch } = useDoctors(1, "");

  const queryClient = useQueryClient();

  function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPhone(value);
  }

  async function onSubmit(values: z.infer<typeof updateDoctorFormSchema>) {
    if (values.phone) {
      values.phone = values.phone.replace(/[^\d]/g, "");
    }
    const updatedFields = Object.keys(values).reduce<
      Partial<z.infer<typeof updateDoctorFormSchema>>
    >((acc, key) => {
      if (
        values[key as keyof z.infer<typeof updateDoctorFormSchema>] !==
        doctor?.[key as keyof DoctorDetailResponse]
      ) {
        acc[key as keyof z.infer<typeof updateDoctorFormSchema>] =
          values[key as keyof z.infer<typeof updateDoctorFormSchema>];
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
          queryKey: ["doctors"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Doutor Atualizado com Sucesso", {
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

  return (
    <div className={cn("grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DefaultField
            name="name"
            className="mb-4"
            form={form}
            label="Nome"
            placeholder="Digite o Nome do Cliente"
            type="text"
            isError={isError}
          />

          <DefaultField
            name="email"
            className="mb-4"
            form={form}
            label="Email"
            placeholder="Digite o Email do Cliente"
            type="text"
            isError={isError}
          />

          <DefaultField
            name="password"
            className="mb-4"
            form={form}
            label="Senha"
            placeholder="Digite a Senha do Cliente"
            type="text"
            isError={isError}
          />

          <DefaultField
            name="phone"
            className="mb-8"
            form={form}
            label="Telefone"
            placeholder="Digite o Telefone do Cliente"
            type="text"
            isError={isError}
            onInput={handlePhoneInput}
          />

          <div className="mt-4 flex items-center justify-center space-x-4">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Atualizar
            </Button>
            <DialogDeleteDoctor id={id} onClose={() => setIsOpen(false)} />
          </div>
        </form>
      </Form>
    </div>
  );
}
