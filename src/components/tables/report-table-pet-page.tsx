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
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import {
  ListReportsResponse,
  fetchDataReportsByPet,
} from "@/hooks/reports/use-reports-by-pet";
import { DialogReport } from "../dialogs/report/dialog-report";
import { IsLoadingTable } from "./is-loading-table";

interface IReportTablePetPageProps {
  data: ListReportsResponse | undefined;
  petName?: string;
}

export function ReportTablePetPage({
  data,
  petName,
}: IReportTablePetPageProps) {
  const { user } = useUser();
  const router = useRouter();

  const pathName = usePathname();
  const param = pathName.split("/")[5];

  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery(
    ["reports", param],
    () => fetchDataReportsByPet(param, user?.token),
    {
      initialData: data,
      keepPreviousData: true,
    }
  );

  return (
    <>
      {isLoading ? (
        <IsLoadingTable />
      ) : reports ? (
        <div className="relative w-full">
          <div className="overflow-x-auto w-full">
            <Table className="w-full pb-10  rounded-3xl relative table-color-style dark:bg-zinc-800 py-8 px-4">
              <TableHeader className="font-medium text-sm dark:text-gray-300">
                <TableRow className=" w-full flex  px-4">
                  <TableHead className="text-start w-[200px] lg:w-[400px]">
                    Nome
                  </TableHead>
                  <TableHead className="text-start w-[200px]">
                    Clínica
                  </TableHead>
                  <TableHead className="text-start w-[200px]">
                    Ultimo Atendimento
                  </TableHead>
                  <TableHead className="text-start w-[200px]">
                    Cliente
                  </TableHead>
                  <TableHead className="text-start w-[80px]">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full ">
                {reports?.reports.map((item) => (
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
        </div>
      ) : (
        isError && (
          <Link href={`/exam-portal`}>
            Ops, você não está autenticado, por favor realize o login clicando
            aqui!
          </Link>
        )
      )}
    </>
  );
}
