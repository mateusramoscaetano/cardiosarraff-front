"use client";
import { useEffect, useState } from "react";
import { HeaderSection } from "./header-section";
import { ClientTable } from "../tables/client-table";
import { useClients } from "@/hooks/client/use-clients";
import { IsLoadingTable } from "../tables/is-loading-table";

interface IClientSectionProps {}

export function ClientSection({}: IClientSectionProps) {
  const [search, setSearch] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useClients(currentPage, search);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col">
        <HeaderSection
          subtitle="Veja, edite e cadastre novos clientes"
          title="Clientes"
          placeholder="Pesquisar por cliente ou pet"
          labelButton="Novo Cliente"
          setSearch={setSearch}
          page="client"
        />
        {isLoading ? (
          <IsLoadingTable />
        ) : data ? (
          <ClientTable
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            search={search}
          />
        ) : (
          <div className="text-black">No data available</div>
        )}
      </div>
    </>
  );
}
