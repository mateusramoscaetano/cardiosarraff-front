"use client";
import { useQuery } from "react-query";

import { ClientDetailTable } from "../tables/client-detail-table";
import { fetchDataClient, useClient } from "@/hooks/client/use-client";
import { usePathname } from "next/navigation";
import { useDoctor } from "@/hooks/doctors/use-doctor";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { usePetsClientPage } from "@/hooks/pets/use-pet-by-client";
import { HeaderDetail } from "../_dashboard/header-detail";
import { ClientDetailExamPortalTable } from "../tables/client-detail-exam-portal-table";
import { DoctorDetailResponse } from "@/@types/tdoctor-table-data";

interface IClientDetailExamPortalProps {}

export function ClientDetailExamPortal({}: IClientDetailExamPortalProps) {
  const pathName = usePathname();
  const pathParts = pathName?.split("/");
  const params = pathParts?.[2];

  const { data: client } = useClient(params);

  const { data: clients } = useQuery(
    ["client", params],
    () => fetchDataClient(params),
    {
      initialData: client,
      keepPreviousData: true,
    }
  );

  const { data: pets } = usePetsClientPage(params);

  return (
    <>
      <div className="w-full mx-auto px-10 py-6 flex flex-col h-full mb-40 dark:bg-zinc-800">
        {client && (
          <ClientDetailExamPortalTable
            client={clients}
            data={client}
            pets={pets}
          />
        )}
      </div>
    </>
  );
}
