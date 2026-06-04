"use client";

import { ClientDetailTextBox } from "@/components/text-boxes/client-detail-text-box";
import { usePathname } from "next/navigation";
import { fetchDataClient } from "@/hooks/client/use-client";
import { useQuery } from "react-query";
import { Client } from "@/@types/client";
import { fetchDataPetsClientPage } from "@/hooks/pets/use-pet-by-client";
import { PetTable } from "./pet-table";
import { ResponsePetsListOnPetOwnerPage } from "@/@types/tpet-table-data";
import { useReportsByClient } from "@/hooks/reports/use-reports-by-client";
import { ReportTableClientPage } from "./report-table-client-page";
import { useDoctor } from "@/hooks/doctors/use-doctor";
import { HeaderClient } from "../_exam-portal/header-client";
import { PetTable2 } from "./pet-table-2";

interface IClientDetailExamPortalTableProps {
  client?: Client;
  data: Client;
  pets: ResponsePetsListOnPetOwnerPage | undefined;
}

export function ClientDetailExamPortalTable({
  client,
  data,
  pets,
}: IClientDetailExamPortalTableProps) {
  const searchParams = usePathname();
  const pathParts = searchParams?.split("/");
  const params = pathParts?.[2];

  const { data: petData, isLoading: isReportsLoading } = useReportsByClient(params);
  const { data: doctor } = useDoctor(client?.doctorId);

  useQuery(["client", params], () => fetchDataClient(params), {
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
      <div className="hidden md:block relative w-full">
        <div className="w-full flex flex-col pt-14 pb-20 px-10 rounded-xl relative">
          <div className="w-full table-color-style p-3 rounded-xl mb-10">
            <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 text-[#1e1e1e] dark:text-gray-100">
              {client?.name}
            </div>
            <div className="w-full space-x-9 flex">
              <div className="w-[88%] flex flex-row space-x-9">
                <ClientDetailTextBox
                  field={client?.userName}
                  fieldTitle="Usuário"
                />
                <ClientDetailTextBox
                  field={typeof doctor === "string" ? doctor : doctor?.name}
                  fieldTitle="Doutor"
                />
                <ClientDetailTextBox
                  field={client?.phone}
                  fieldTitle="Telefone"
                />
              </div>
            </div>
          </div>
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 text-[#1e1e1e] dark:text-gray-100">
            Pets
          </div>
          <PetTable2 pets={petsRefetch} />
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 mt-6">
            Laudos
          </div>
          <ReportTableClientPage data={petData} />
        </div>
      </div>

      <div className="md:hidden relative w-full px-4 pb-6">
        <div className="w-full flex flex-col pt-14 rounded-xl text-[#1e1e1e] dark:text-gray-100 relative">
          <HeaderClient client={client} />
        </div>
        <div className="text-lg font-semibold mt-6 mb-4">Meus laudos</div>
        <PetTable data={petData} isLoading={isReportsLoading} />
      </div>
    </>
  );
}
