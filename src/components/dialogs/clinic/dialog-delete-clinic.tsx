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
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/buttons/button-shad";
import { useClinics } from "@/hooks/clinic/use-clinics";
import { useDeleteClinic } from "@/hooks/clinic/use-delete-clinic";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/use-user";

interface IDialogDeleteClinicProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  onClose: () => void;
}

export function DialogDeleteClinic({ id, onClose }: IDialogDeleteClinicProps) {
  const { mutateAsync, isLoading } = useDeleteClinic(id);
  const queryClient = useQueryClient();
  const { refetch } = useClinics(1, "");
  const { user } = useUser();

  async function handleClick(id: string) {
    mutateAsync(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["clinics"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Clinica excluída com Sucesso", {
            theme: "light",
            style: { color: "darkslategray" },
          });
        }, 1000);
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {user?.user.role === "adm" && (
          <Button
            disabled={isLoading}
            type="button"
            className="bg-red-500 hover:bg-red-500/80 w-[94px] text-white"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Excluir
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-gray-100">
            Você tem certeza que deseja excluir?
          </AlertDialogTitle>
          <AlertDialogDescription className="dark:text-gray-300">
            Essa ação não pode ser revertida e os dados serão apagados do
            servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary text-white dark:bg-primary dark:text-white dark:hover:bg-primary/80">
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
