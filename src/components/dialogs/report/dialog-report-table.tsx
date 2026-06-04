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
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { convertDate } from "@/utils/convertData";
import { AxiosResponse } from "axios";

import Image from "next/image";
import { DialogDeleteReportPetPage } from "./dialog-delete-report-pet-page";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  useEffect(() => {
    setExamType(item.type || "");
  }, [item.type]);

  const updateExamType = async (newType: string) => {
    try {
      await api.patch(`/report/${item.id}/type`, {
        type: newType,
      });
      setExamType(newType);
      toast.success("Tipo de exame atualizado.");
    } catch (error) {
      toast.error("Erro ao atualizar tipo do exame.");
    }
  };

  const openWhatsAppOwner = async () => {
    try {
      const ownerPhoneNumber = sanitizePhoneNumber(item.pet.pet_owner.phone);

      if (!ownerPhoneNumber) {
        toast.error("Telefone do dono não disponível.");
        return;
      }

      const petResponse: AxiosResponse<PetDetail> = await api.get(
        `/pet/${item.pet.id}`
      );
      const petDetails = petResponse.data;

      const message = `Olá!
O laudo do seu pet está disponível em nossa plataforma!

Acesse clicando no link https://www.exavet.com.br/exam-portal
e realizando o login com o seu e-mail e a senha ${petDetails.pet_owner.password}`;

      const whatsappUrl = `https://wa.me/55${ownerPhoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      toast.error("Erro ao abrir WhatsApp do dono.");
    }
  };

  const openWhatsAppClinic = async () => {
    try {
      let clinicPhone = item.Clinic?.phone;

      if (!clinicPhone) {
        const clinicId = item.Clinic?.id || item.clinicId;

        if (!clinicId) {
          toast.error("Telefone da clínica não disponível.");
          return;
        }

        const clinicResponse = await api.get(`/clinic/${clinicId}`);
        clinicPhone = clinicResponse.data.phone;
      }

      const clinicPhoneNumber = sanitizePhoneNumber(clinicPhone);

      if (!clinicPhoneNumber) {
        toast.error("Telefone da clínica não disponível.");
        return;
      }

      const message = `Olá!
O laudo do pet está disponível em nossa plataforma!

Acesse clicando no link https://www.exavet.com.br/exam-portal
e realizando o login com o seu e-mail e a senha.`;

      const whatsappUrl = `https://wa.me/55${clinicPhoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      toast.error("Erro ao abrir WhatsApp da clínica.");
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
        <DialogContent className="max-w-[520px] rounded-xl bg-[#f2f2f2] text-black dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl dark:text-gray-100">
              {name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h1 className="font-bold text-sm">Nome do Dono</h1>
              <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                {petOwner}
              </p>
            </div>
            <div className="space-y-1">
              <h1 className="font-bold text-sm">Doutor Responsável</h1>
              <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                {doctor}
              </p>
            </div>
            <div className="space-y-1">
              <h1 className="font-bold text-sm">Data de upload</h1>
              <p className="font-medium text-sm text-[#575656] dark:text-gray-300">
                {date}
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <h1 className="font-bold text-sm">Tipo do Exame</h1>
            <Select
              modal={false}
              value={examType || undefined}
              onValueChange={(value) => {
                setExamType(value);
                updateExamType(value);
              }}
            >
              <SelectTrigger className="w-full h-10 focus:outline-none focus:ring-0 border-gray-300 border bg-white dark:bg-zinc-800">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent position="popper" side="top" align="start">
                {EXAM_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {user?.user.role === "adm" && (
            <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                size="md"
                variant="primary"
                className="w-full bg-[#4DCB5B] hover:bg-[#45B850]"
                onClick={openWhatsAppOwner}
              >
                WhatsApp Dono
              </Button>
              <Button
                size="md"
                variant="primary"
                className="w-full bg-[#4DCB5B] hover:bg-[#45B850]"
                onClick={openWhatsAppClinic}
              >
                WhatsApp Clínica
              </Button>
            </div>
          )}

          <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              className="w-full"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="md" variant="primary" className="w-full">
                Download do Arquivo
              </Button>
            </a>

            {(user?.user.role === "adm" || user?.user.role === "doctor") && (
              <DialogDeleteReportPetPage
                onClose={() => setIsOpen(false)}
                id={item.id}
                className="w-full"
              />
            )}
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
