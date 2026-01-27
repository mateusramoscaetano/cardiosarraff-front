"use client";

import { UseCreateReportForm } from "@/components/form/report-form/use-create-report-form";
import { Button } from "@/components/_app/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import cn from "@/utils/cn";

interface IDialogCreateReportProps {
  className?: string;
  isOnPetDetailPage: boolean;
}

export function DialogCreateReport({
  className,
  isOnPetDetailPage,
}: IDialogCreateReportProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <DialogTrigger asChild>
          <Button
            size="md"
            variant="primary"
            className={cn("hover:scale-105 hover:shadow-lg transition-all duration-300", className)}
          >
            Novo Laudo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Cadastrar Laudo
            </DialogTitle>
            {!isOnPetDetailPage && (
              <DialogDescription className="font-medium text-sm dark:text-gray-300">
                Caso seja apenas um pet novo basta incluir um novo pet em um
                cliente já cadastrado.
              </DialogDescription>
            )}
          </DialogHeader>
          <UseCreateReportForm
            onClose={() => setIsOpen(false)}
            isOnPetDetailPage={isOnPetDetailPage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
