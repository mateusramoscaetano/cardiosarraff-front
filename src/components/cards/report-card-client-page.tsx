import { convertDate } from "@/utils/convertData";
import HeadButton from "../buttons/head-button";
import {
  formatPetNameFromPath,
  formatReportDisplayName,
} from "@/utils/format-report-display-name";

interface IReportCardClientPageProps {
  path: string;
  date: Date;
  url: string;
}

export function ReportCardClientPage({
  date,
  path,
  url,
}: IReportCardClientPageProps) {
  const petDisplayName = formatPetNameFromPath(path);
  const laudoDisplayName = formatReportDisplayName({
    petName: petDisplayName,
    createdAt: date,
    path,
  });

  return (
    <div className="w-full table-color-style rounded-xl text-[13px] px-5 py-5 space-y-3 flex flex-col">
      <div>
        <div className="h-5 font-medium px-2 mb-2">Pet</div>
        <div className="flex items-center px-2 h-6 rounded-xl truncate">
          {petDisplayName}
        </div>
      </div>

      <div className="w-full">
        <div className="h-5 font-medium">Laudo</div>
        <div
          className="flex items-center leading-tight px-3 py-2 min-h-10 rounded-xl bg-white dark:bg-zinc-800 w-full mt-1"
          title={laudoDisplayName}
        >
          <span className="truncate w-full">{laudoDisplayName}</span>
        </div>
      </div>

      <div>
        <div className="h-5 font-medium">Data</div>
        <div className="flex items-center px-2 h-6 rounded-xl bg-white dark:bg-zinc-800 mt-1">
          {convertDate(date.toString())}
        </div>
      </div>

      <a
        className="w-full border-none"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <HeadButton
          label="Baixar Laudo"
          size="large"
          className="mt-2 w-full"
        />
      </a>
    </div>
  );
}
