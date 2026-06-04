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
import { useDeleteReport } from "@/hooks/reports/use-delete-report";
import { useReports } from "@/hooks/reports/use-reports";

interface IDialogDeleteReportPetPageProps {
  onClose: () => void;
  id: string;
  className?: string;
}

export function DialogDeleteReportPetPage({
  onClose,
  id,
  className,
}: IDialogDeleteReportPetPageProps) {
  const { refetch } = useReports(1, "");

  const { mutateAsync, isLoading } = useDeleteReport(id);

  async function handleClick(id: string) {
    mutateAsync(id, {
      onSuccess: async () => {
        refetch();
        setTimeout(() => {
          onClose();
        }, 1000);
        location.reload();
      },
    });
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className={`flex h-9 items-center justify-center gap-2 rounded-xl bg-error-bg p-1 text-xs font-medium text-white hover:bg-error-bg hover:opacity-80 ${className || "w-full"}`}
          >
            {`Excluir`}
          </button>
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
            <AlertDialogAction
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => handleClick(id)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
