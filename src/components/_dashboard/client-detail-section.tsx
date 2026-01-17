"use client";
import { useQuery } from "react-query";
import { HeaderDetail } from "./header-detail";
import { ClientDetailTable } from "../tables/client-detail-table";
import { fetchDataClient, useClient } from "@/hooks/client/use-client";
import { usePathname } from "next/navigation";
import { useDoctor } from "@/hooks/doctors/use-doctor";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { usePetsClientPage } from "@/hooks/pets/use-pet-by-client";

interface IClientDetailSectionProps {}

export function ClientDetailSection({}: IClientDetailSectionProps) {
  const pathName = usePathname();
  const params = pathName.split("/")[4];

  const { data: client } = useClient(params);
  const { data: doctor } = useDoctor(client?.doctorId);

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
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col dark:bg-zinc-800">
        <HeaderDetail
          title="Perfil do Cliente"
          subtitle="Edite informações e cadastre novos Pets"
          page="Cliente"
          id={params}
        />
        {client && (
          <ClientDetailTable
            doctor={doctor}
            client={clients}
            data={client}
            pets={pets}
          />
        )}
      </div>
    </>
  );
}
