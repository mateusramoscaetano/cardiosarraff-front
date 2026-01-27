"use client";

import { ClientDetailTextBox } from "@/components/text-boxes/client-detail-text-box";
import { DialogUpdateClientDetail } from "../dialogs/client/dialog-update-client-detail";
import { usePathname } from "next/navigation";
import { fetchDataClient } from "@/hooks/client/use-client";
import { useQuery } from "react-query";
import { Client } from "@/@types/client";
import { DoctorDetailResponse } from "@/@types/tdoctor-table-data";
import { fetchDataPetsClientPage } from "@/hooks/pets/use-pet-by-client";
import { PetTable } from "./pet-table";
import { DialogCreatePet } from "../dialogs/pet/dialog-create-pet";
import { ResponsePetsListOnPetOwnerPage } from "@/@types/tpet-table-data";
import { PetTable2 } from "./pet-table-2";

interface IClientDetailTableProps {
  client?: Client;
  doctor?: DoctorDetailResponse;
  data: Client;
  pets: ResponsePetsListOnPetOwnerPage | undefined;
}

export function ClientDetailTable({
  client,
  doctor,
  data,
  pets,
}: IClientDetailTableProps) {
  const searchParams = usePathname();
  const params = searchParams.split("/")[4];

  const {
    data: clients,
    isLoading,
    isError,
    refetch,
  } = useQuery(["client", params], () => fetchDataClient(params), {
    initialData: data,
    keepPreviousData: true,
  });

  const { data: petsRefetch } = useQuery(
    ["pets-client", params],
    () => fetchDataPetsClientPage(params),
    {
      initialData: pets,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="relative w-full">
        <div className="w-full flex flex-col pt-14 pb-20  px-4 md:px-10 rounded-xl relative table-color-style">
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5">
            {client?.name}
          </div>
          <div className="w-full  flex flex-col md:flex-row mb-[88px] gap-4">
            <div className="w-[88%] flex flex-col md:flex-row gap-4">
              <ClientDetailTextBox field={client?.email} fieldTitle="E-mail" />
              <ClientDetailTextBox field={doctor?.name} fieldTitle="Doutor" />
              <ClientDetailTextBox
                field={client?.phone}
                fieldTitle="Telefone"
              />
            </div>
            <div className="w-[12%] flex items-end pb-[3px]">
              <DialogUpdateClientDetail className="" id={params} data={data} />
            </div>
          </div>
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5">
            Pets
          </div>
          <PetTable2 pets={petsRefetch} />
          <div className="w-full flex items-center justify-start md:justify-end mt-10">
            <DialogCreatePet
              isOnForm={false}
              className="h-10 w-[100px] md:w-[200px] gap-4 "
              isOnClientPage={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
