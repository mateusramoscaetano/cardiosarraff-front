import { Client } from "@/@types/client";
import { UserUpdateClientForm } from "@/components/form/client-form/user-update-client-form";
import { UserUpdatePetForm } from "@/components/form/pet-form/user-update-pet-form";
import { PetDetail } from "@/components/tables/pet-detail-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchDataClient } from "@/hooks/client/use-client";
import { fetchDataPetDetail } from "@/hooks/pets/use-pet-detail";
import cn from "@/utils/cn";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

interface IDialogUpdatePetProps {
  className?: string;
  id: string;
  data?: Partial<PetDetail>;
  buttonText?: string;
  buttonClassName?: string;
  isOnPetDetailPage?: boolean;
}

export function DialogUpdatePet({
  className,
  id,
  data,
  buttonText = "Editar",
  buttonClassName = "h-10 rounded-3xl w-[160px] gap-2",
  isOnPetDetailPage = false,
}: IDialogUpdatePetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: petData, refetch } = useQuery(
    ["pet-detail", id],
    () => fetchDataPetDetail(id),
    {
      initialData: data,
      keepPreviousData: true,
      enabled: !!id,
    }
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <DialogTrigger asChild className={cn(className)}>
          <Button className={cn(buttonClassName)}>
            <span className={isOnPetDetailPage ? "" : "hidden md:block"}>
              {buttonText}
            </span>
            <SquarePen className="ml-1 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "max-w-[425px] rounded-lg bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700"
          )}
        >
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100 text-[#1e1e1e]">
              Editar Cadastro
            </DialogTitle>
          </DialogHeader>
          <UserUpdatePetForm onClose={() => setIsOpen(false)} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
