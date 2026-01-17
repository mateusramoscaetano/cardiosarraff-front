import { useEffect, useState } from "react";
import { HeaderSection } from "./header-section";
import { ReportTable } from "../tables/report-table";
import { fetchDataReports } from "@/hooks/reports/use-reports";
import { fetchDataReportsByClinic } from "@/hooks/reports/user-reports-by-clinic";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "react-query";
import { ReportTableSkeleton } from "../tables/report-table-skeleton";
import { ReportFilters } from "./report-filters";

interface IReportSectionProps {}

export function ReportSection({}: IReportSectionProps) {
  const [search, setSearch] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string | undefined>("pet");
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);

  const { user } = useUser();

  const filters =
    filterType && filterType !== "all" && filterValue
      ? ({
          [filterType]: filterValue,
        } as {
          doctor?: string;
          petOwner?: string;
          pet?: string;
          clinic?: string;
        })
      : undefined;

  const {
    data: reportsData,
    isLoading,
    isFetching,
  } = useQuery(
    user?.user.role === "adm" || user?.user.role === "doctor"
      ? ["admin-reports", currentPage, search, filterType, filterValue]
      : [
          "clinic-reports",
          currentPage,
          search,
          filterType,
          filterValue,
          user?.user.id,
        ],
    () =>
      user?.user.role === "adm" || user?.user.role === "doctor"
        ? fetchDataReports(currentPage, search, filters)
        : fetchDataReportsByClinic(currentPage, search, user?.user.id, filters),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterType, filterValue]);

  const handleClearFilters = () => {
    if (filterType === "all") {
      setSearch(undefined);
    }
    setFilterType("pet");
    setFilterValue(undefined);
  };

  return (
    <>
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col">
        <HeaderSection
          subtitle="Laudos cadastrados em ordem cronológica"
          title="Últimos Laudos"
          placeholder="Pesquisar por cliente, pet ou doutor..."
          labelButton="Cadastrar Novo Laudo"
          setSearch={setSearch}
          page="report"
          hideSearch={true}
        />
        <ReportFilters
          filterType={filterType}
          filterValue={filterValue}
          onFilterTypeChange={setFilterType}
          onFilterValueChange={setFilterValue}
          onClearFilters={handleClearFilters}
          isClinicUser={user?.user.role === "clinic"}
          search={search}
          setSearch={setSearch}
        />
        {isLoading || isFetching ? (
          <ReportTableSkeleton />
        ) : reportsData ? (
          <ReportTable
            data={reportsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            search={search}
            dataByClinic={reportsData}
          />
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
}
