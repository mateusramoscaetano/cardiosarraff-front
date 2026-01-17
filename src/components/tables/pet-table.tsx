"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDate } from "@/utils/convertData";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReportCardClientPage } from "../cards/report-card-client-page";
import { ListReportsResponse } from "@/hooks/reports/use-reports-by-pet";

interface IPetTableProps {
  data: ListReportsResponse | undefined;
}

export function PetTable({ data }: IPetTableProps) {
  const router = useRouter();
  const pathName = usePathname();

  const pathParts = pathName?.split("/");
  const param = pathParts?.[4];

  const handleClick = (id: string) => {
    router.push(`/crm/dashboard/client/${param}/${id}`);
  };

  return (
    <>
      {data?.reports.map((item) => (
        <ReportCardClientPage
          key={item.id}
          petName={item.path}
          path={item.path}
          date={item.createdAt}
          petOwner={item.petOwner}
          url={item.url}
        />
      ))}
    </>
  );
}
