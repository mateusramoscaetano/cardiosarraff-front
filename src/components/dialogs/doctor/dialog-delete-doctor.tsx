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
import { useDeleteDoctor } from "@/hooks/doctors/use-delete-doctor";
import { useDoctors } from "@/hooks/doctors/use-doctors";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/use-user";

interface IDialogDeleteDoctorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  onClose: () => void;
}

export function DialogDeleteDoctor({ id, onClose }: IDialogDeleteDoctorProps) {
  const { mutateAsync, isLoading } = useDeleteDoctor(id);
  const queryClient = useQueryClient();
  const { refetch } = useDoctors(1, "");
  const { user } = useUser();

  async function handleClick(id: string) {
    mutateAsync(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["doctors"],
        });
        refetch();
        setTimeout(() => {
          onClose();
          toast.success("Doutor excluído com Sucesso", {
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
