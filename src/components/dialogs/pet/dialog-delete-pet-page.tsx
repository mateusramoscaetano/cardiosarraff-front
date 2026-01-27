"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useClients } from "@/hooks/client/use-clients";
import { useDeletePet } from "@/hooks/pets/use-delete-pet";
import { usePets } from "@/hooks/pets/use-pets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IDialogDeletePetPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  entity: string;
  page: "Cliente" | "Pet";
  id: string;
}

export function DialogDeletePetPage({
  onClose,
  page,
  entity,
  id,
}: IDialogDeletePetPageProps) {
  const { refetch } = useClients(1, "");
  const { refetch: refetchPets } = usePets(1, "");
  const router = useRouter();

  const { mutateAsync, isLoading } = useDeletePet(id);

  async function handleClick(id: string) {
    mutateAsync(id, {
      onSuccess: async () => {
        refetchPets();
        refetch();
        setTimeout(() => {
          onClose();
          toast.success(`${entity}  com Sucesso`, {
            theme: "light",
            style: { color: "darkslategray" },
          });
        }, 1000);
        router.back();
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="rounded-xl bg-error-bg justify-center hover:bg-error-bg p-1 text-white gap-2 text-sm  w-[160px] h-10 font-medium"
        >
          {`Excluir ${page}`}
          <Image
            src="/delete-icon-detail.png"
            width={22}
            height={22}
            alt="arrow"
            className="w-auto "
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja excluir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida e os dados serão apagados do
            servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClick(id)}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
