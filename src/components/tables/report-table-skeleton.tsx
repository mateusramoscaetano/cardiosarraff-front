import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReportTableSkeleton() {
  return (
    <div className="relative w-full">
      <div className="overflow-x-auto w-full">
        <Table className="w-full pt-9 pb-20 px-10 rounded-xl relative min-w-[900px] table-color-style">
          <TableHeader className="font-medium text-sm dark:text-gray-300 border-b-0">
            <TableRow className="w-full flex px-4">
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
          <TableBody className="w-full">
            {Array.from({ length: 6 }).map((_, index) => {
              const nameWidths = ["w-[180px]", "w-[250px]", "w-[200px]", "w-[220px]", "w-[190px]", "w-[210px]"];
              const petWidths = ["w-[60px]", "w-[80px]", "w-[70px]", "w-[90px]", "w-[75px]", "w-[65px]"];
              const typeWidths = ["w-[140px]", "w-[160px]", "w-[150px]", "w-[170px]", "w-[145px]", "w-[155px]"];
              const clinicWidths = ["w-[120px]", "w-[140px]", "w-[130px]", "w-[150px]", "w-[125px]", "w-[135px]"];
              
              return (
                <TableRow
                  key={index}
                  className="text-sm w-full h-[49px] border-none"
                >
                  <TableCell colSpan={4} className="cursor-pointer">
                    <div className="flex items-center bg-white dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 rounded-xl w-full h-[49px] p-4 mb-2 relative hover-parent">
                      <span className="w-[200px] lg:w-[400px]">
                        <div className={`h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse ${nameWidths[index] || "w-[200px]"}`}></div>
                      </span>
                      <span className="w-[120px]">
                        <div className={`h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse ${petWidths[index] || "w-[80px]"}`}></div>
                      </span>
                      <span className="w-[200px]">
                        <div className={`h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse ${typeWidths[index] || "w-[150px]"}`}></div>
                      </span>
                      <span className="w-[200px]">
                        <div className={`h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse ${clinicWidths[index] || "w-[130px]"}`}></div>
                      </span>
                      <span className="w-[80px]">
                        <div className="h-4 w-[70px] bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                      </span>
                      <div className="w-[13px] h-[13px] bg-gray-200 dark:bg-zinc-700 rounded animate-pulse absolute right-6"></div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="absolute bottom-5 flex justify-between w-full px-10">
        <div className="flex flex-col gap-1 ml-4">
          <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[18px] w-[18px] bg-gray-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
          <div className="h-[18px] w-[18px] bg-gray-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
          <div className="h-[18px] w-[18px] bg-gray-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

