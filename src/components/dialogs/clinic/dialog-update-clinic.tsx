"use client";

import { Clinic } from "@/@types/tclinic-table-data";
import { UserUpdateClinicForm } from "@/components/form/clinic-form/user-update-clinic-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import cn from "@/utils/cn";
import { formatPhoneNumber } from "@/utils/phoneMask";
import Image from "next/image";
import { useState } from "react";

interface IDialogUpdateClinicProps {
  className?: string;
  id: string;
  item: Clinic;
}

export function DialogUpdateClinic({
  className,
  id,
  item,
}: IDialogUpdateClinicProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <DialogTrigger asChild className={cn(className)}>
          <TableRow
            key={item.id}
            className="text-sm w-full h-[49px] border-none"
          >
            <TableCell colSpan={4}>
              <div
                className="flex items-center bg-white hover:bg-primary hover:text-white 
                  rounded-3xl w-full h-[49px] p-4 mb-2 relative hover-parent dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white"
              >
                <span className="w-[200px] lg:w-[400px]">{item.name}</span>

                <span className="w-[200px] pl-2">
                  {formatPhoneNumber(item.phone)}
                </span>

                <Image
                  src="/right-arrow.png"
                  width={13}
                  height={13}
                  alt="arrow"
                  className="hover-image absolute right-6 w-auto"
                />
              </div>
            </TableCell>
          </TableRow>
        </DialogTrigger>
        <DialogContent
          className={cn(
            " bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
          )}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Atualizar Clinica
            </DialogTitle>
          </DialogHeader>
          <UserUpdateClinicForm onClose={() => setIsOpen(false)} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
