import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";

import { SetStateAction } from "react";
import { PaginationTable } from "../_dashboard/pagination-table";
import { ResponseTableClinicData } from "@/@types/tclinic-table-data";
import { useQuery } from "react-query";
import { fetchDataClinics } from "@/hooks/clinic/use-clinics";
import { DialogUpdateClinic } from "../dialogs/clinic/dialog-update-clinic";

interface IClinicTableProps {
  data: ResponseTableClinicData;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  search: string | undefined;
}

export function ClinicTable({
  data,
  currentPage,
  setCurrentPage,
  search,
}: IClinicTableProps) {
  const {
    data: clinics,
    isLoading,
    isError,
  } = useQuery(
    ["clinics", currentPage, search],
    () => fetchDataClinics(currentPage, search),
    {
      initialData: data,
      keepPreviousData: true,
    }
  );

  return (
    <div className="relative w-full">
      <div className="overflow-x-auto w-full">
        <Table className="w-full bg-[#f2f2f2] pt-9 pb-20 px-10 rounded-3xl text-[#1e1e1e] relative dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <TableHeader className="font-medium text-sm dark:text-gray-300">
            <TableRow className=" w-full flex  px-4">
              <TableHead className="text-start w-[200px] lg:w-[400px]">
                Nome
              </TableHead>
              <TableHead className="text-start w-[200px]">Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {clinics?.clinics.map((item) => (
              <DialogUpdateClinic id={item.id} item={item} key={item.id} />
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationTable
        currentPage={currentPage}
        data={clinics?.clinics || []}
        fetchPage={setCurrentPage}
        totalPages={clinics?.totalPages || 1}
      />
    </div>
  );
}
