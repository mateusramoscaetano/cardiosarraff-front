import { DataItem } from "@/@types/ireport-table-data";
import { Button } from "@/components/_app/ui/button";
import { PetDetail } from "@/components/tables/pet-detail-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Report } from "@/hooks/reports/use-reports-by-pet";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { convertDate } from "@/utils/convertData";
import { AxiosResponse } from "axios";

import Image from "next/image";
import { DialogDeleteReportPetPage } from "./dialog-delete-report-pet-page";
import { useState } from "react";

interface IDialogTableProps {
  name?: string;
  petOwner: string;
  date: string;
  doctor: string;
  url: string;

  item: DataItem;
}

const EXAM_TYPES = [
  "Raio X",
  "Tomografia",
  "Cardiologia",
  "Exame Laboratorial",
  "Ultrassonografia",
];

export function DialogReportTable({
  name,
  petOwner,
  date,
  doctor,
  url,
  item,
}: IDialogTableProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [examType, setExamType] = useState<string>(item.type || "");

  const updateExamType = async (newType: string) => {
    try {
      await api.patch(`/report/${item.id}/type`, {
        type: newType,
      });
      setExamType(newType);
    } catch (error) {
      console.error("Erro ao atualizar tipo do exame:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TableRow
            key={item.id}
            className="text-sm w-full h-[49px] border-none"
          >
            <TableCell colSpan={4} className="cursor-pointer">
              <div
                className="flex items-center bg-white hover:bg-primary hover:text-white dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 dark:hover:bg-primary dark:hover:text-white
                rounded-xl w-full h-[49px] p-4 mb-2 relative hover-parent"
              >
                <span className="w-[200px] lg:w-[400px]">
                  {item.pet.pet_owner.name}
                </span>
                <span className="w-[120px]">{item.pet.name}</span>
                <span className="w-[200px]">
                  {item.type ? item.type : "Não informado"}
                </span>
                <span className="w-[200px]">{item.Clinic.name}</span>
                <span className="w-[80px]">{convertDate(item.createdAt)}</span>
                <Image
                  src="/right-arrow.png"
                  width={13}
                  height={13}
                  alt="arrow"
                  className="hover-image absolute right-6 w-auto"
                />
              </div>
            </TableCell>
          </TableRow>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] lg:max-w-[460px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl dark:text-gray-100">
              {name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full space-y-1">
                <h1 className="font-bold text-sm">Nome do Dono</h1>
                <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                  {petOwner}
                </p>
              </div>
              <div className="w-full space-y-1">
                <h1 className="font-bold text-sm">Doutor Responsável</h1>
                <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                  {doctor}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full space-y-1">
                <h1 className="font-bold text-sm">Data de upload</h1>
                <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                  {date}
                </p>
              </div>
              <div className="w-full space-y-1">
                <h1 className="font-bold text-sm">Tipo do Exame</h1>
                <Select
                  value={examType}
                  onValueChange={(value) => {
                    setExamType(value);
                    updateExamType(value);
                  }}
                >
                  <SelectTrigger className="w-full h-5 focus:outline-none focus:ring-0 border-gray-300 border-[1px]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAM_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-2">
              {user?.user.role === "adm" && (
                <Button
                  size="md"
                  variant="primary"
                  className="bg-[#4DCB5B] hover:bg-[#45B850]"
                  onClick={async () => {
                    const petResponse: AxiosResponse<PetDetail> = await api.get(
                      `/pet/${item.pet.id}`
                    );
                    const petDetails = petResponse.data;
                    const ownerPhoneNumber = sanitizePhoneNumber(
                      item.pet.pet_owner.phone
                    );

                    const message = `Olá!
              O laudo do seu pet está disponível em nossa plataforma!
      
            Acesse clicando no link https://www.exavet.com.br/exam-portal
            e realizando o login com o seu e-mail e a senha ${petDetails.pet_owner.password}
              `;

                    const whatsappUrl = `https://wa.me/55${ownerPhoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                />
              )}
              {user?.user.role === "adm" && (
                <Button
                  size="md"
                  variant="primary"
                  className="bg-[#4DCB5B] hover:bg-[#45B850]"
                  onClick={async () => {
                    const clinicResponse = await api.get(
                      `/clinic/${item.Clinic.id}`
                    );
                    const clinicDetails = clinicResponse.data;
                    const clinicPhoneNumber = sanitizePhoneNumber(
                      clinicDetails.phone
                    );

                    const message = `Olá!
              O laudo do pet está disponível em nossa plataforma!

            Acesse clicando no link https://www.exavet.com.br/exam-portal
            e realizando o login com o seu e-mail e a senha.
              `;

                    const whatsappUrl = `https://wa.me/55${clinicPhoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                />
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
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
                <DialogDeleteReportPetPage
                  onClose={() => setIsOpen(false)}
                  id={item.id}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function sanitizePhoneNumber(value: string): string {
  if (!value) return "";
  let digits = value.replace(/\D+/g, "");
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  digits = digits.replace(/^0+/, "");
  return digits;
}
