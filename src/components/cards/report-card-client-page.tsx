import { convertDate } from "@/utils/convertData";
import HeadButton from "../buttons/head-button";

interface IReportCardClientPageProps {
  petName: string;
  path: string;
  date: Date;
  petOwner: string;
  url: string;
}

export function ReportCardClientPage({
  date,
  path,
  petName,
  petOwner,
  url,
}: IReportCardClientPageProps) {
  const pathParts = path?.split("/");
  const petOwnerFormatted = petOwner?.toLowerCase().replaceAll(" ", "_");
  const laudoPart = pathParts?.[2]?.split(petOwnerFormatted)?.[1];

  const petNameParts = petName?.split("/");
  const petNameRaw = petNameParts?.[1];
  const uppercasePetName = petNameRaw ? petNameRaw.replaceAll("_", " ") : "";
  const test = uppercasePetName.slice(0, 1);
  const test2 = uppercasePetName.slice(1, uppercasePetName.length);
  const ultimatePetName = test.toLocaleUpperCase().concat(test2);
  const laudo = laudoPart ? laudoPart.slice(0, -4) : `${ultimatePetName} Laudo`;

  return (
    <div className="w-full table-color-style rounded-xl text-[13px] px-5 mb-5 py-5 space-y-3 flex flex-col">
      <div className="h-5 font-medium px-2 mb-2">Pet</div>
      <div className="flex items-center px-2 h-6 rounded-xl  mb-4 dark:text-gray-100">
        {ultimatePetName}
      </div>

      <div className="w-full">
        <div className="h-5 font-medium">Laudo</div>
      </div>
      <div className="flex items-center justify-center leading-tight px-2 h-10 rounded-xl bg-white dark:bg-zinc-800 mb-4 w-full">
        <div className="w-full flex items-center">{laudo}</div>
      </div>

      <div className="w-1/2">
        <div className="h-5 font-medium">Data</div>
      </div>
      <div className="flex items-center px-2 h-6 rounded-xl bg-white dark:bg-zinc-800 mb-4">
        <div className="w-full flex items-center">
          {convertDate(date.toString())}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <a
          className="border-none"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HeadButton label="Baixar Laudo" size="large" className="mt-4" />
        </a>
      </div>
    </div>
  );
}
