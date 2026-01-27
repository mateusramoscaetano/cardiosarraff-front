"use client";
import { ClientDetailTextBox } from "@/components/text-boxes/client-detail-text-box";
import { useReportsByPet } from "@/hooks/reports/use-reports-by-pet";
import { usePathname } from "next/navigation";
import { ReportTablePetPage } from "./report-table-pet-page";
import { DialogUpdatePet } from "../dialogs/pet/dialog-update-pet";
import { usePetDetail } from "@/hooks/pets/use-pet-detail";
import { convertDate } from "@/utils/convertData";
import { DialogCreateReport } from "../dialogs/report/dialog-create-report";
import { useUser } from "@/hooks/use-user";
import { IsLoadingTable } from "./is-loading-table";

export type PetDetail = {
  id: string;
  name: string;
  age: string;
  race: string;
  specie: string;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
  pet_owner_id: string;
  reports: [{ id: string; url: string }];
  pet_owner: {
    name: string;
    phone: string;
    password: string;
  };
};

interface IPetDetailTableProps {
  pet: PetDetail | undefined;
}

export function PetDetailTable({ pet }: IPetDetailTableProps) {
  const pathName = usePathname();
  const param = pathName.split("/")[5];
  const { user } = useUser();

  const { data: petData } = useReportsByPet(param);
  const { data: petDetail, isLoading } = usePetDetail(param);

  return (
    <>
      {isLoading ? (
        <IsLoadingTable />
      ) : pet ? (
        <div className="relative w-full">
          <div className="w-full flex flex-col pt-14 pb-20 px-10 rounded-xl relative table-color-style">
            <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5 dark:text-gray-100">
              {pet?.name}
            </div>
            <div className="w-full  flex flex-col md:flex-row mb-[88px] gap-4">
              <div className="w-[80%] flex flex-col md:flex-row gap-4">
                <ClientDetailTextBox field={pet?.specie} fieldTitle="Espécie" />
                <ClientDetailTextBox field={pet?.weight} fieldTitle="Peso" />
                <ClientDetailTextBox field={pet?.race} fieldTitle="Raça" />
                <ClientDetailTextBox
                  field={`${pet?.age} anos`}
                  fieldTitle="Idade"
                  className=""
                />
              </div>
              <div className="w-[12%] flex items-end pb-[3px]">
                {((petDetail && user?.user.role === "adm") ||
                  user?.user.role === "doctor") && (
                  <DialogUpdatePet
                    data={petDetail}
                    id={param}
                    isOnPetDetailPage={true}
                  />
                )}
              </div>
            </div>
            <div className="w-full text-2xl font-semibold tracking-normal mb-3 pl-5">
              Laudos
            </div>
            <ReportTablePetPage data={petData} petName={pet?.name} />
            {(user?.user.role === "adm" || user?.user.role === "doctor") && (
              <div className="w-full flex items-center justify-start md:justify-end mt-10">
                <DialogCreateReport isOnPetDetailPage={true} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Erro interno do servidor</div>
      )}
    </>
  );
}
