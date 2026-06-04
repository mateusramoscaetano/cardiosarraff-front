"use client";
import { convertDate } from "@/utils/convertData";
import { ReportCardClientPage } from "../cards/report-card-client-page";
import { ListReportsResponse } from "@/hooks/reports/use-reports-by-client";
import { EmptyState } from "../ui/empty-state";
import { IsLoadingTable } from "./is-loading-table";

interface IPetTableProps {
  data: ListReportsResponse | undefined;
  isLoading?: boolean;
}

export function PetTable({ data, isLoading }: IPetTableProps) {
  if (isLoading) {
    return <IsLoadingTable />;
  }

  if (!data?.reports?.length) {
    return (
      <EmptyState
        title="Nenhum laudo disponível"
        description="Quando seu veterinário enviar um exame, ele aparecerá aqui."
      />
    );
  }

  return (
    <div className="space-y-4">
      {data.reports.map((item) => (
        <ReportCardClientPage
          key={item.id}
          path={item.path}
          date={item.createdAt}
          url={item.url}
        />
      ))}
    </div>
  );
}
