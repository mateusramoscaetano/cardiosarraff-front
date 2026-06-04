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
        <DialogContent className="max-w-[480px] gap-0 overflow-hidden rounded-xl border-0 bg-[#f2f2f2] p-0 text-black dark:bg-zinc-900 dark:text-gray-100">
          <div className="space-y-5 p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="font-bold text-2xl dark:text-gray-100">
                {name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl bg-white p-4 dark:bg-zinc-800">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                  Nome do Dono
                </p>
                <p className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100">
                  {petOwner}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                  Doutor Responsável
                </p>
                <p className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100">
                  {doctor}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                  Data de upload
                </p>
                <p className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100">
                  {date}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                  Clínica
                </p>
                <p className="text-sm font-medium text-[#1e1e1e] dark:text-gray-100">
                  {item.Clinic?.name || "Não informada"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                Tipo do Exame
              </p>
              <Select
                value={examType || undefined}
                onValueChange={(value) => {
                  setExamType(value);
                  updateExamType(value);
                }}
              >
                <SelectTrigger className="h-10 w-full border border-gray-300 bg-white focus:outline-none focus:ring-0 dark:border-zinc-600 dark:bg-zinc-800">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start">
                  {EXAM_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 border-t border-zinc-200 bg-white/70 p-6 dark:border-zinc-700 dark:bg-zinc-800/70">
            {user?.user.role === "adm" && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                  Notificar via WhatsApp
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    className="h-9 w-full bg-[#4DCB5B] text-xs hover:bg-[#45B850] hover:scale-100"
                    onClick={openWhatsAppOwner}
                  >
                    Dono
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    className="h-9 w-full bg-[#4DCB5B] text-xs hover:bg-[#45B850] hover:scale-100"
                    onClick={openWhatsAppClinic}
                  >
                    Clínica
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#575656] dark:text-gray-400">
                Arquivo
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  className="w-full"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    variant="primary"
                    className="h-9 w-full text-xs hover:scale-100"
                  >
                    Download
                  </Button>
                </a>

                {(user?.user.role === "adm" ||
                  user?.user.role === "doctor") && (
                  <DialogDeleteReportPetPage
                    onClose={() => setIsOpen(false)}
                    id={item.id}
                    className="h-9 w-full text-xs"
                  />
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function sanitizePhoneNumber(value: string | undefined): string {
  if (!value) return "";
  let digits = value.replace(/\D+/g, "");
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  digits = digits.replace(/^0+/, "");
  return digits;
}
