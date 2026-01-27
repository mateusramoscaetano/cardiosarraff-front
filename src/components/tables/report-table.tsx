import { SetStateAction } from "react";
import { convertDate } from "@/utils/convertData";
import { ResponseTableReportData } from "@/@types/ireport-table-data";
import { DialogReportTable } from "../dialogs/report/dialog-report-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationTable } from "../_dashboard/pagination-table";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import useCookie from "@/hooks/use-cookies";
import { ReportTableSkeleton } from "./report-table-skeleton";

interface IReportTableProps {
  data: ResponseTableReportData;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  search: string | undefined;
  dataByClinic?: ResponseTableReportData;
}

export function ReportTable({
  data,
  currentPage,
  setCurrentPage,
  dataByClinic,
}: IReportTableProps) {
  const { getCookie } = useCookie();
  const router = useRouter();
  const { user } = useUser();

  if (!getCookie("user")) {
    router.push("/exam-portal");
  }

  const isAdminOrDoctor =
    user?.user.role === "adm" || user?.user.role === "doctor";

  const displayData = isAdminOrDoctor ? data : dataByClinic;

  return (
    <div className="relative w-full">
      <div className="overflow-x-auto w-full">
        <Table className="w-full  pt-9 pb-20 px-10 rounded-xl  relative min-w-[900px] table-color-style">
          <TableHeader className="font-medium text-sm dark:text-gray-300 border-b-0">
            <TableRow className="w-full flex  px-4">
              <TableHead className="text-start w-[200px] lg:w-[400px]">
                Nome
              </TableHead>
              <TableHead className="text-start w-[120px]">Pet</TableHead>
              <TableHead className="text-start w-[200px]">
                Tipo do Exame
              </TableHead>
              <TableHead className="text-start w-[200px]">Clínica</TableHead>
              <TableHead className="text-start w-[80px]">Data</TableHead>
              <TableHead className="w-[30px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full ">
            {displayData?.reports.map((item) => (
              <DialogReportTable
                key={item.id}
                name={item.pet.name}
                petOwner={item.pet.pet_owner.name}
                doctor={item.pet.pet_owner.doctor.name}
                date={convertDate(item.createdAt)}
                url={item.url}
                item={item}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationTable
        currentPage={currentPage}
        data={displayData?.reports || []}
        totalPages={displayData?.totalPages || 1}
        fetchPage={setCurrentPage}
      />
    </div>
  );
}
