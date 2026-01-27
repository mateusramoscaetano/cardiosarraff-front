import { Client } from "@/@types/client";
import { UserUpdateClientForm } from "@/components/form/client-form/user-update-client-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchDataClient } from "@/hooks/client/use-client";
import cn from "@/utils/cn";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

interface IDialogUpdateClientDetailProps {
  className?: string;
  id: string;
  data: Client;
}

export function DialogUpdateClientDetail({
  className,
  id,
  data,
}: IDialogUpdateClientDetailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refetch } = useQuery(["client"], () => fetchDataClient(id), {
    initialData: data,
    keepPreviousData: true,
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <DialogTrigger asChild className={cn(className)}>
          <Button className="h-10 rounded-xl w-[160px] gap-2">
            Editar
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "sm:max-w-[425px] bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
          )}
        >
          <DialogHeader>
            <DialogTitle>Editar Cadastro</DialogTitle>
          </DialogHeader>
          <UserUpdateClientForm onClose={() => setIsOpen(false)} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
