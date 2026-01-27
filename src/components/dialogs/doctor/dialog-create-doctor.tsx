"use client";

import { UserCreateDoctorForm } from "@/components/form/dcotor-form/user-create-doctor-form";
import { Button } from "@/components/_app/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import cn from "@/utils/cn";
import { useState } from "react";

interface IDialogCreateDoctorProps {
  className?: string;
  isOnForm: boolean;
}
export function DialogCreateDoctor({
  className,
  isOnForm,
}: IDialogCreateDoctorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <DialogTrigger asChild className={cn(className)}>
            <Button size="md" variant="primary">
              Novo Doutor
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn(
              "max-w-[425px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
            )}
          >
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl">
                Cadastrar Doutor
              </DialogTitle>
            </DialogHeader>
            <UserCreateDoctorForm onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}
