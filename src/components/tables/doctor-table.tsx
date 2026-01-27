import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";

import { SetStateAction } from "react";
import { PaginationTable } from "../_dashboard/pagination-table";
import { ResponseTableDoctorData } from "@/@types/tdoctor-table-data";
import { fetchDataDoctors } from "@/hooks/doctors/use-doctors";
import { useQuery } from "react-query";
import { DialogUpdateDoctor } from "../dialogs/doctor/dialog-update-doctor";

interface IDoctorTableProps {
  data: ResponseTableDoctorData;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  search: string | undefined;
}

export function DoctorTable({
  data,
  currentPage,
  setCurrentPage,
  search,
}: IDoctorTableProps) {
  const {
    data: doctors,
    isLoading,
    isError,
  } = useQuery(
    ["doctors", currentPage, search],
    () => fetchDataDoctors(currentPage, search),
    {
      initialData: data,
      keepPreviousData: true,
    }
  );

  return (
    <div className="relative w-full">
      <Table className="w-full bg-[#f2f2f2] pt-9 pb-20 px-10 rounded-xl text-[#1e1e1e] relative dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
        <TableHeader className="font-medium text-sm dark:text-gray-300">
          <TableRow className=" w-full flex justify-between px-4">
            <TableHead className="text-start w-[200px] lg:w-[400px]">
              Nome
            </TableHead>
            <TableHead className="text-start w-[400px]">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full ">
          {doctors?.doctors.map((item) => (
            <DialogUpdateDoctor id={item.id} item={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
      <PaginationTable
        currentPage={currentPage}
        data={doctors?.doctors || []}
        fetchPage={setCurrentPage}
        totalPages={doctors?.totalPages || 1}
      />
    </div>
  );
}
