import { Button } from "@/components/_app/ui/button";
import { PetDetail } from "@/components/tables/pet-detail-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { convertDate } from "@/utils/convertData";
import { AxiosResponse } from "axios";

import { useState } from "react";
import { DialogDeleteReportPetPage } from "./dialog-delete-report-pet-page";

interface ReportPetPage {
  id: string;
  url: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  pet_id: string;
  clinicId: string | null;
  clinic: string | null;
  petOwner: string;
  phone: string;
  petId: string;
  doctor: { name: string };
}

interface IDialogReportProps {
  name?: string;
  petOwner: string;
  date: string;
  doctor: { name: string };
  url: string;
  item: ReportPetPage;
}

export function DialogReport({
  name,
  petOwner,
  date,
  doctor,
  url,
  item,
}: IDialogReportProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TableRow
            key={item.id}
            className="text-sm w-full h-[49px] border-none"
          >
            <TableCell colSpan={4}>
              <div
                className="flex items-center bg-white hover:bg-primary hover:text-white 
                  rounded-xl w-full h-[49px] p-4 mb-2 relative hover-parent dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 "
              >
                <span className="w-[200px] lg:w-[400px] truncate">{`${
                  item.path
                    .split("/")[2]
                    .split(petOwner.replaceAll(" ", "_").toLowerCase())[1]
                }`}</span>
                <span className="w-[200px]">{item.clinic}</span>
                <span className="w-[200px]">{item.doctor.name}</span>
                <span className="w-[200px]">
                  {item.path.split("/")[1].replaceAll("_", " ")}
                </span>
                <span className="w-[80px]">
                  {convertDate(item.createdAt.toString())}
                </span>
              </div>
            </TableCell>
          </TableRow>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl dark:text-gray-100">
              {name}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full space-y-1">
            <h1 className="font-bold text-sm">Nome do Dono</h1>
            <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
              {petOwner}
            </p>
          </div>
          <div className="w-full space-y-1">
            <h1 className="font-bold text-sm">Doutor Responsável</h1>
            <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
              {doctor.name}
            </p>
          </div>
          <div className="w-full space-y-1">
            <h1 className="font-bold text-sm">Data de upload</h1>
            <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
              {date}
            </p>
          </div>
          <a
            className="border-none"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="md" variant="primary">
              Download do Arquivo
            </Button>
          </a>
          {(user?.user.role === "adm" || user?.user.role === "doctor") && (
            <Button
              size="md"
              variant="primary"
              className="bg-[#4DCB5B] hover:bg-[#45B850]"
              onClick={async () => {
                const petResponse: AxiosResponse<PetDetail> = await api.get(
                  `/pet/${item.petId}`
                );
                const petDetails = petResponse.data;
                const ownerPhoneNumber = item.phone;

                const message = `Olá!
              O laudo do seu pet está disponível em nossa plataforma!
      
            Acesse clicando no link https://www.coracardiologia.com.br/exam-portal
            e realizando o login com o seu e-mail e a senha ${petDetails.pet_owner.password}
              `;

                const whatsappUrl = `https://wa.me/55${ownerPhoneNumber}?text=${encodeURIComponent(
                  message
                )}`;
                window.open(whatsappUrl, "_blank");
              }}
            />
          )}
          {(user?.user.role === "adm" || user?.user.role === "doctor") && (
            <DialogDeleteReportPetPage
              onClose={() => setIsOpen(false)}
              id={item.id}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
