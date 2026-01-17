"use client";

import { ClientDetailTextBox } from "@/components/text-boxes/client-detail-text-box";

import { usePathname } from "next/navigation";
import { fetchDataClient } from "@/hooks/client/use-client";
import { useQuery } from "react-query";
import { Client } from "@/@types/client";

import { fetchDataPetsClientPage } from "@/hooks/pets/use-pet-by-client";
import { PetTable } from "./pet-table";
import { DialogCreatePet } from "../dialogs/pet/dialog-create-pet";
import { ResponsePetsListOnPetOwnerPage } from "@/@types/tpet-table-data";
import { ReportTablePetPage } from "./report-table-pet-page";
import { useReportsByClient } from "@/hooks/reports/use-reports-by-client";
import { ReportTableClientPage } from "./report-table-client-page";
import { useDoctor } from "@/hooks/doctors/use-doctor";
import { HeaderClient } from "../_exam-portal/header-client";

import { PetTable2 } from "./pet-table-2";
import { useEffect, useState } from "react";

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

  const { data: petData } = useReportsByClient(params);
  const { data: doctor } = useDoctor(client?.doctorId);

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="relative w-full">
        <div className="w-full  flex flex-col pt-14 pb-20 px-10 rounded-3xl relative">
          <div className="w-full table-color-style p-3 rounded-3xl mb-10">
            <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 text-[#1e1e1e] dark:text-gray-100">
              {client?.name}
            </div>
            <div className="w-full space-x-9 flex ">
              <div className="w-[88%] flex flex-row space-x-9">
                <ClientDetailTextBox
                  field={client?.email}
                  fieldTitle="E-mail"
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
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 text-[#1e1e1e] dark:text-gray-100 ">
            Pets
          </div>
          <PetTable2 pets={petsRefetch} />
          <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5">
            Laudos
          </div>
          {petData && <ReportTableClientPage data={petData} />}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full">
        <div className="w-full flex flex-col  pt-14 pb-4  rounded-3xl text-[#1e1e1e] dark:text-gray-100 relative">
          <HeaderClient client={client} />
        </div>
        <PetTable data={petData} />
      </div>
    </>
  );
}
