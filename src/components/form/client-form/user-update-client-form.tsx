import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useUser } from "@/hooks/use-user";
import { useClient } from "@/hooks/client/use-client";
import { useClinics } from "@/hooks/clinic/use-clinics";
import { useClinic } from "@/hooks/clinic/use-clinic";
import {
  useUpdateClient,
  updateClientFormSchema,
} from "@/hooks/client/use-update-client";
import { DefaultField } from "../fields/default-field";
import { FieldSearchForm } from "../fields/field-search-form";
import { Button } from "../../_app/ui/button";
import { Form } from "../form";
import { AxiosError } from "axios";
import { TErrorAlreadyRegistered } from "@/@types/terror-email-already-registered";
import { Client } from "@/@types/client";
import formatPhone from "@/utils/formatPhone";
import cn from "@/utils/cn";
import { Icons } from "../../ui/icons";
import { TClinicsWithClinicIdAndName } from "../report-form/use-create-report-form";
import { useClients } from "@/hooks/client/use-clients";

interface UserUpdateClientFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  id: string;
}

export function UserUpdateClientForm({
  className,
  onClose,
  id,
  ...props
}: UserUpdateClientFormProps) {
  const { user } = useUser();
  const { data: client } = useClient(id);
  const [searchClinic, setSearchClinic] = useState<string | undefined>("");
  const [searchValueClinic, setSearchValueClinic] = useState<string>("");
  const [isSelected, setIsSelected] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [clinicsWithClinicIdAndName, setClinicsWithClinicIdAndName] = useState<
    TClinicsWithClinicIdAndName[]
  >([]);

  const form = useForm<z.infer<typeof updateClientFormSchema>>({
    resolver: zodResolver(updateClientFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      clinicId: "" || undefined,
    },
  });

  const { data: clinicName } = useClinic(client?.clinicId);

  useEffect(() => {
    if (clinicName?.name) {
      setInputValue(clinicName.name);
    }
  }, [clinicName]);

  useEffect(() => {
    if (client) {
      form.reset({
        email: client.email,
        password: client.password,
        name: client.name,
        phone: client.phone,
        clinicId: clinicName?.id,
      });
    }
  }, [client, form, clinicName?.id]);

  const { data: clinicsData } = useClinics(1, searchClinic);

  useEffect(() => {
    if (searchClinic && clinicsData) {
      const selectResultOfClinicsData = clinicsData.clinics.map((clinic) => {
        return { id: clinic.id, name: clinic.name };
      });
      setClinicsWithClinicIdAndName(selectResultOfClinicsData);
    }
  }, [clinicsData, searchClinic]);

  const { mutateAsync, isLoading, isError } = useUpdateClient(user?.token, id);
  const queryClient = useQueryClient();
  const { refetch: refetchClients } = useClients(1, "");

  function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    event.target.value = formatPhone(value);
  }

  async function onSubmit(values: z.infer<typeof updateClientFormSchema>) {
    const updatedFields = Object.keys(values).reduce<
      Partial<z.infer<typeof updateClientFormSchema>>
    >((acc, key) => {
      if (
        values[key as keyof z.infer<typeof updateClientFormSchema>] !==
        client?.[key as keyof Client]
      ) {
        acc[key as keyof z.infer<typeof updateClientFormSchema>] =
          values[key as keyof z.infer<typeof updateClientFormSchema>];
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
          queryKey: ["client"],
        });
        refetchClients();
        setTimeout(() => {
          onClose();
          toast.success("Cliente Atualizado com Sucesso", {
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
          <FieldSearchForm
            form={form}
            filteredArgsWithIdAndName={clinicsWithClinicIdAndName}
            formLabel="Pesquisar Clinica"
            inputPlaceholder="Digite o nome da clínica"
            isSelected={isSelected}
            name="clinicId"
            resultsLabel="Clinicas Encontradas"
            search={searchClinic}
            searchValue={inputValue}
            setFilteredArgsWithIdAndName={setClinicsWithClinicIdAndName}
            setIsSelected={setIsSelected}
            setSearch={setSearchClinic}
            setSearchValue={(value) => {
              setSearchValueClinic(value);
              setInputValue(value);
            }}
            isError={isError}
          />
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
