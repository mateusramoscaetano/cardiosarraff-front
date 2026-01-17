import { DataItem } from "@/@types/ireport-table-data";
import { Client } from "@/@types/tclient-table-data";
import { Clinic } from "@/@types/tclinic-table-data";
import { Doctor } from "@/@types/tdoctor-table-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IPaginationTableProps {
  currentPage: number;
  totalPages: number | undefined;
  data: DataItem[] | Client[] | Clinic[] | Doctor[] | undefined;
  fetchPage: (page: number) => void;
}

export function PaginationTable({
  currentPage,
  data,
  totalPages,
  fetchPage,
}: IPaginationTableProps) {
  function getPages(current: number, total: number) {
    if (total <= 4) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];

    pages.push(1);

    if (current <= 2) {
      pages.push(2);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 1) {
      pages.push("...");
      pages.push(total - 1);
      pages.push(total);
    } else {
      pages.push("...");
      pages.push(current);
      pages.push(current + 1);
      pages.push("...");
      pages.push(total);
    }

    return pages.filter((item, idx, arr) => {
      if (item === "..." && arr[idx - 1] === "...") return false;
      return true;
    });
  }

  return (
    <>
      <Pagination className="absolute bottom-5  flex justify-between">
        <span className="text-[#1e1e1e] dark:text-gray-100 text-[10px] ml-14 leading-tight">
          {`Página`}
          <br />
          {`${currentPage} de ${totalPages}`}
        </span>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem className="text-black">
              <PaginationPrevious
                href="#"
                onClick={() => fetchPage(currentPage - 1)}
                isActive={currentPage === 1}
                className="w-full h-full"
              />
            </PaginationItem>
          )}
          {getPages(currentPage, totalPages || 1).map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <span className=" text-gray-400 dark:text-gray-300 text-[18px]">
                  ...
                </span>
              ) : (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => fetchPage(Number(page))}
                  size="default"
                  className={
                    currentPage === page
                      ? `text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center text-white bg-primary`
                      : `text-black bg-white dark:bg-zinc-900 dark:text-gray-100 text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center`
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {currentPage !== totalPages && (
            <PaginationItem className="text-black">
              <PaginationNext
                href="#"
                onClick={() => fetchPage(currentPage + 1)}
                isActive={currentPage === totalPages}
                className="w-full h-full"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
