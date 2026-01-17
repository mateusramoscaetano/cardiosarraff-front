"use client";
import { useEffect, useState } from "react";
import { HeaderSection } from "./header-section";
import { ClinicTable } from "../tables/clinic-table";
import { useClinics } from "@/hooks/clinic/use-clinics";
import { IsLoadingTable } from "../tables/is-loading-table";

interface IClinicSectionProps {}

export function ClinicSection({}: IClinicSectionProps) {
  const [search, setSearch] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useClinics(currentPage, search);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col">
        <HeaderSection
          subtitle="Veja, edite e cadastre novas clínicas"
          title="Clínicas"
          placeholder="Pesquisar por clínica"
          labelButton="Cadastrar Nova Clínica"
          setSearch={setSearch}
          page="clinic"
        />
        {isLoading ? (
          <IsLoadingTable />
        ) : data ? (
          <ClinicTable
            data={data}
            currentPage={currentPage}
            search={search}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <div className="text-black">No data available</div>
        )}
      </div>
    </>
  );
}
