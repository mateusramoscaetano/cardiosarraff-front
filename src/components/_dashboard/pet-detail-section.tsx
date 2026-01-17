import { usePetDetail } from "@/hooks/pets/use-pet-detail";
import { HeaderDetail } from "./header-detail";
import { PetDetailTable } from "../tables/pet-detail-table";
import { usePathname } from "next/navigation";

interface IPetDetailSectionProps {}

export function PetDetailSection({}: IPetDetailSectionProps) {
  const pathName = usePathname();
  const param = pathName.split("/")[5];

  const { data: pets } = usePetDetail(param);

  return (
    <>
      <div className="w-full mx-auto px-2 sm:px-4 md:px-8 py-6 flex flex-col">
        <HeaderDetail
          title="Perfil do Pet"
          subtitle="Edite informações e cadastre novos Laudos"
          page="Pet"
          id={param}
        />
        <PetDetailTable pet={pets} />
      </div>
    </>
  );
}
