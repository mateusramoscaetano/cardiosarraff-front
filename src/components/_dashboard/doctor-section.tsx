"use client";

import { useEffect, useState } from "react";
import { HeaderSection } from "./header-section";
import { DoctorTable } from "../tables/doctor-table";
import { useDoctors } from "@/hooks/doctors/use-doctors";
import { IsLoadingTable } from "../tables/is-loading-table";

interface IDoctorSectionProps {}

export function DoctorSection({}: IDoctorSectionProps) {
  const [search, setSearch] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useDoctors(currentPage, search);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col">
        <HeaderSection
          subtitle="Veja, edite e cadastre novos doutores"
          title="Doutores"
          placeholder="Pesquisar por Doutor"
          labelButton="Cadastrar Novo Doutor"
          setSearch={setSearch}
          page="doctor"
        />
        {isLoading ? (
          <IsLoadingTable />
        ) : data ? (
          <DoctorTable
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
