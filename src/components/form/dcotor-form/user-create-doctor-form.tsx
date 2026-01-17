"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cn from "@/utils/cn";
import { Form } from "../form";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import { createClientFormSchema } from "@/hooks/client/use-create-client";
import { AxiosError } from "axios";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import formatPhone from "@/utils/formatPhone";
import { DefaultField } from "../fields/default-field";
import { TErrorAlreadyRegistered } from "@/@types/terror-email-already-registered";
import {
  createDoctorFormSchema,
  useCreateDoctor,
} from "@/hooks/doctors/use-create-doctors";
import { useDoctors } from "@/hooks/doctors/use-doctors";

interface UserCreateDoctorFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export function UserCreateDoctorForm({
  className,
  onClose,
  ...props
}: UserCreateDoctorFormProps) {
  const { user } = useUser();

  const form = useForm<z.infer<typeof createDoctorFormSchema>>({
    resolver: zodResolver(createDoctorFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const { mutateAsync, isLoading, isError } = useCreateDoctor();
  const { refetch } = useDoctors(1, "");

  const queryClient = useQueryClient();

  function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPhone(value);
  }

  async function onSubmit(values: z.infer<typeof createClientFormSchema>) {
    values.phone = values.phone.replace(/[^\d]/g, "");

    mutateAsync(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["doctors"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Doutor Criado com Sucesso", {
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
  );
}
