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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IDialogDeleteReportPetPageProps {
  onClose: () => void;

  id: string;
}

export function DialogDeleteReportPetPage({
  onClose,
  id,
}: IDialogDeleteReportPetPageProps) {
  const { refetch } = useReports(1, "");
  const router = useRouter();

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
            className="hover:opacity-80 rounded-xl flex items-center 2.5sm:h-10 2.5sm:w-[203px] 2sm:h-6 2sm:w-[180px] 3sm:h-6 3sm:w-[180px] 2.5sm:text-[13px] 2sm:text-[9px] 3sm:text-[9px] bg-error-bg justify-center hover:bg-error-bg p-1 text-white gap-2 text-sm  w-[160px] h-10 font-medium"
          >
            {`Excluir Arquivo`}
            <Image
              src="/arrow-cursor-2--mouse-select-cursor.png"
              width={18}
              height={18}
              alt="arrow"
              className="w-auto "
            />
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
            <AlertDialogAction onClick={() => handleClick(id)}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
