import { useEffect, useState } from "react";
import { ReportTable } from "../tables/report-table";
import { fetchDataReports } from "@/hooks/reports/use-reports";
import { fetchDataReportsByClinic } from "@/hooks/reports/user-reports-by-clinic";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "react-query";
import { ReportTableSkeleton } from "../tables/report-table-skeleton";
import { ReportFilters } from "./report-filters";
import { DialogCreateReport } from "../dialogs/report/dialog-create-report";

export function ReportSection() {
  const [search, setSearch] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string | undefined>("all");
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
    setSearch(undefined);
    setFilterType("all");
    setFilterValue(undefined);
  };

  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 pt-12 md:pt-6 flex flex-col">
      <div className="w-full flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <div className="text-black md:flex-shrink-0">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl dark:text-gray-100">
            Últimos Laudos
          </h1>
          <p className="font-medium text-sm text-[#1e1e1e] dark:text-gray-300">
            Laudos cadastrados em ordem cronológica
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full md:flex-1 items-stretch md:items-center gap-4 md:justify-end">
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
          <div className="flex items-center justify-center md:justify-end gap-3 md:flex-shrink-0">
            {(user?.user.role === "adm" || user?.user.role === "doctor") && (
              <DialogCreateReport isOnPetDetailPage={false} />
            )}
          </div>
        </div>
      </div>
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
  );
}
