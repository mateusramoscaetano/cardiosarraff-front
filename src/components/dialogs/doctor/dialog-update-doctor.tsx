"use client";

import { Doctor } from "@/@types/tdoctor-table-data";
import { UserUpdateDoctorForm } from "@/components/form/dcotor-form/user-update-doctor-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import cn from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";

interface IDialogUpdateDoctorProps {
  className?: string;
  id: string;
  item: Doctor;
}
export function DialogUpdateDoctor({
  className,
  id,
  item,
}: IDialogUpdateDoctorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <DialogTrigger asChild className={cn(className)}>
            <TableRow
              key={item.id}
              className="text-sm w-full h-[49px] border-none"
            >
              <TableCell colSpan={4} className="cursor-pointer">
                <div
                  className="flex items-center bg-white hover:bg-primary hover:text-white 
                  rounded-3xl w-full h-[49px] p-4 mb-2 relative hover-parent justify-between dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white"
                >
                  <span className="w-[200px] lg:w-[400px] truncate">
                    {item.name}
                  </span>

                  <span className="w-[400px] pl-2 truncate">{item.email}</span>

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
              "sm:max-w-[425px] bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
            )}
          >
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl dark:text-gray-100">
                Atualizar Doutor
              </DialogTitle>
            </DialogHeader>
            <UserUpdateDoctorForm onClose={() => setIsOpen(false)} id={id} />
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}
