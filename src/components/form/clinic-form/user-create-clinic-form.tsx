"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../form";
import cn from "@/utils/cn";
import {
  createClinicFormSchema,
  useCreateClinic,
} from "@/hooks/clinic/use-create-clinic";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TErrorAlreadyRegistered } from "@/@types/terror-email-already-registered";
import { DefaultField } from "../fields/default-field";
import formatPhone from "@/utils/formatPhone";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import { useClinics } from "@/hooks/clinic/use-clinics";

interface IUserCreateClinicProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}
export function UserCreateClinic({
  className,
  onClose,
  ...props
}: IUserCreateClinicProps) {
  const form = useForm<z.infer<typeof createClinicFormSchema>>({
    resolver: zodResolver(createClinicFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
    },
  });

  const { mutateAsync, isLoading, isError } = useCreateClinic();
  const { refetch } = useClinics(1, "");

  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof createClinicFormSchema>) {
    mutateAsync(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["clinics"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Clinica Criada com Sucesso", {
            theme: "light",
            style: { color: "darkslategray" },
          });
        }, 1000);
      },
      onError: (error) => {
        const errorMessage = (
          (error as AxiosError<{ message?: string }>).response?.data as
            | TErrorAlreadyRegistered
            | { message?: string }
            | undefined
        )?.message;

        if (errorMessage === "email already registered") {
          form.setError("email", {
            type: "server",
            message: "Este email já está registrado",
          });
          return;
        }

        if (errorMessage === "clinic already registered") {
          form.setError("name", {
            type: "server",
            message: "Clínica já cadastrada",
          });
          return;
        }

        if (errorMessage) {
          form.setError("email", {
            type: "server",
            message: errorMessage,
          });
          return;
        }

        form.setError("email", {
          type: "server",
          message: "Erro ao criar clínica",
        });
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
