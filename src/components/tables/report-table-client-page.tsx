"use client";
import { convertDate } from "@/utils/convertData";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "react-query";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ListReportsResponse,
  fetchDataReportsByClient,
} from "@/hooks/reports/use-reports-by-client";
import { DialogReport } from "../dialogs/report/dialog-report";
import { IsLoadingTable } from "./is-loading-table";
import { EmptyState } from "../ui/empty-state";

interface IReportTableClientPageProps {
  data: ListReportsResponse | undefined;
  petName?: string;
}

export function ReportTableClientPage({
  data,
  petName,
}: IReportTableClientPageProps) {
  const pathName = usePathname();
  const pathParts = pathName?.split("/");
  const param = pathParts?.[2];

  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery(["reports", param], () => fetchDataReportsByClient(param), {
    initialData: data,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <IsLoadingTable />;
  }

  if (isError) {
    return (
      <Link href="/exam-portal">
        Ops, você não está autenticado, por favor realize o login clicando aqui!
      </Link>
    );
  }

  if (!reports?.reports?.length) {
    return (
      <EmptyState
        title="Nenhum laudo disponível"
        description="Quando seu veterinário enviar um exame, ele aparecerá aqui."
      />
    );
  }

  return (
    <div className="relative w-full">
      <Table className="w-full table-color-style rounded-xl relative p-3">
        <TableHeader className="font-medium text-sm dark:text-gray-300">
          <TableRow className="w-full flex px-4">
            <TableHead className="text-start w-[200px] lg:w-[400px]">
              Nome
            </TableHead>
            <TableHead className="text-start w-[200px]">Clínica</TableHead>
            <TableHead className="text-start w-[200px]">
              Ultimo Atendimento
            </TableHead>
            <TableHead className="text-start w-[200px]">Pet</TableHead>
            <TableHead className="text-start w-[80px]">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {reports.reports.map((item) => (
            <DialogReport
              key={item.id}
              item={item}
              name={petName}
              petOwner={item.petOwner}
              doctor={item.doctor}
              date={convertDate(item.createdAt.toString())}
              url={item.url}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
