import { ResponseTableClientData } from "@/@types/tclient-table-data";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import Image from "next/image";
import React, { SetStateAction, useContext } from "react";
import { useQuery } from "react-query";
import { PaginationTable } from "../_dashboard/pagination-table";
import { fetchPage } from "@/hooks/client/use-clients";
import { useRouter } from "next/navigation";
import { ClientContext } from "@/contexts/type";
import { IsLoadingTable } from "./is-loading-table";

interface IClientTableProps {
  data: ResponseTableClientData;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  search: string | undefined;
}

export function ClientTable({
  data,
  currentPage,
  setCurrentPage,
  search,
}: IClientTableProps) {
  const {
    data: clients,
    isLoading,
    isError,
  } = useQuery(
    ["clients", currentPage, search],
    () => fetchPage(currentPage, search),
    {
      initialData: data,
      keepPreviousData: true,
    }
  );

  const { id, setId } = useContext(ClientContext);
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/crm/dashboard/client/${id}`);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-x-auto w-full">
        <Table className="w-full bg-[#f2f2f2] pt-9 pb-20 px-10 rounded-xl text-[#1e1e1e] relative dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <TableHeader className="font-medium text-sm dark:text-gray-300">
            <TableRow className=" w-full flex  px-4">
              <TableHead className="text-start w-[200px] lg:w-[400px]">
                Nome
              </TableHead>
              <TableHead className="text-start w-[50px]">Pets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full ">
            {clients?.petOwners.map((item) => (
              <>
                {isLoading ? (
                  <IsLoadingTable />
                ) : (
                  <TableRow
                    key={item.id}
                    className="text-sm w-full h-[49px] border-none"
                    onClick={() => handleClick(item.id)}
                  >
                    <TableCell colSpan={4}>
                      <div
                        className="flex items-center bg-white hover:bg-primary hover:text-white dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white
                rounded-xl w-full h-[49px] p-4 mb-2 relative hover-parent  "
                      >
                        <span className="w-[200px] lg:w-[400px]">
                          {item.name}
                        </span>
                        <span className="w-[50px] pl-2">
                          {item.pets.length.toString().padStart(2, "0")}
                        </span>
                        <Image
                          src="/right-arrow.png"
                          width={13}
                          height={13}
                          alt="arrow"
                          className="hover-image absolute right-4 w-auto "
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationTable
        currentPage={currentPage}
        data={clients?.petOwners || []}
        fetchPage={setCurrentPage}
        totalPages={clients?.totalPages || 1}
      />
    </div>
  );
}
