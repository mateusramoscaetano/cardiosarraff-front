"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { DialogUpdatePet } from "../dialogs/pet/dialog-update-pet";

interface IPetTable2Props {
  pets:
    | [
        {
          id: string;
          name: string;
          race: string;
          age: string;
          specie: string;
          reports: [{ id: string }];
        }
      ]
    | undefined;
}

export function PetTable2({ pets }: IPetTable2Props) {
  const router = useRouter();
  const pathName = usePathname();
  const clientId = pathName.split("/")[4];
  const { user } = useUser();

  const handleClick = (id: string) => {
    if (user?.user.role === "adm" || user?.user.role === "doctor") {
      router.push(`/crm/dashboard/client/${clientId}/${id}`);
    }
  };

  return (
    <>
      <div className="relative w-full table-color-style p-3 rounded-3xl">
        <div className="overflow-x-auto w-full">
          <Table className="w-full rounded-3xl relative min-w-[900px] dark:bg-zinc-800 py-3">
            <TableHeader className="font-medium text-sm dark:text-gray-300 text-[#1e1e1e]">
              <TableRow className="w-full flex px-4">
                {(user?.user.role === "adm" ||
                  user?.user.role === "doctor") && (
                  <TableHead className="text-start w-[130px]">Ações</TableHead>
                )}
                <TableHead className="text-start w-[130px] lg:w-[400px]">
                  Nome
                </TableHead>
                <TableHead className="text-start w-[120px]">Espécie</TableHead>
                <TableHead className="text-start w-[120px]">Raça</TableHead>
                <TableHead className="text-start w-[100px]">Laudos</TableHead>
                <TableHead className="text-start w-[150px]">Idade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {pets?.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-sm w-full h-[49px] border-none group"
                >
                  <TableCell colSpan={3}>
                    <div className="flex w-full">
                      {(user?.user.role === "adm" ||
                        user?.user.role === "doctor") && (
                        <div className="mr-2 flex items-center mb-2">
                          <DialogUpdatePet
                            id={item.id}
                            buttonText="Editar"
                            buttonClassName="h-8 rounded-3xl w-[100px] gap-1 text-xs"
                          />
                        </div>
                      )}
                      <div
                        className="w-full flex px-4 bg-white hover:bg-primary hover:text-white 
                    rounded-3xl h-[49px] p-4 mb-2 relative hover-parent cursor-pointer items-center dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white text-[#1e1e1e]"
                        onClick={() => handleClick(item.id)}
                      >
                        <span className="w-[130px] lg:w-[400px] pl-2 truncate">
                          {item.name}
                        </span>
                        <span className="w-[120px] pl-1 truncate">
                          {item.specie}
                        </span>
                        <span className="w-[120px] pl-1 truncate">
                          {item.race}
                        </span>
                        <span className="w-[100px] pl-1">
                          {item.reports.length.toString().padStart(2, "0")}
                        </span>
                        <span className="w-[150px] pl-1">{item.age} anos</span>
                        <Image
                          src="/right-arrow.png"
                          width={13}
                          height={13}
                          alt="arrow"
                          className="hover-image absolute right-6 w-auto"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
