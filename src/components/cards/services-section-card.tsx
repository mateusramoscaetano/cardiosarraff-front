import cn from "@/utils/cn";
import Image from "next/image";
interface IServicesSectionCardProps {
  title?: string;
}

export function ServicesSectionCard({ title }: IServicesSectionCardProps) {
  return (
    <>
      <div className="flex items-center justify-start w-[200px] gap-2">
        <div className="rounded-full bg-primary 3sm:w-3 3sm:h-3"></div>
        <span className="text-[#1e1e1e] font-medium">{title}</span>
      </div>
    </>
  );
}
