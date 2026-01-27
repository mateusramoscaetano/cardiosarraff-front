"use client";

import { UserCreateClinic } from "@/components/form/clinic-form/user-create-clinic-form";
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

interface IDialogCreateClinicProps {
  className?: string;
  isOnForm: boolean;
}

export function DialogCreateClinic({
  className,
  isOnForm,
}: IDialogCreateClinicProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <DialogTrigger asChild className={cn(className)}>
          <Button size="md" variant="primary">
            Nova Clinica
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "max-w-[425px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
          )}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Cadastrar Clinica
            </DialogTitle>
          </DialogHeader>
          <UserCreateClinic onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
